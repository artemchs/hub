"use client";

import {
  useState,
  useRef,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  Combobox,
  ScrollArea,
  useCombobox,
  Pill,
  PillsInput,
  Group,
  CheckIcon,
  Button,
  ActionIcon,
  type ComboboxStore,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import type {
  CreateOneModal,
  DeleteOneModal,
  UpdateOneModal,
} from "~/types/modals";

interface DataMultiSelectProps<T> {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  displayComponent: React.ComponentType<{ id: string }>;
  useInfiniteQuery: (filter: string) => {
    data?: { pages: { items: T[] }[] };
    isLoading: boolean;
    isError: boolean;
    fetchNextPage: () => Promise<unknown>;
    isFetchingNextPage: boolean;
  };
  getOptionLabel: (item: T) => string;
  CreateOneModal?: CreateOneModal;
  UpdateOneModal?: UpdateOneModal;
  DeleteOneModal?: DeleteOneModal;
  disabled?: boolean;
}

export function DataMultiSelect<T extends { id: string }>({
  ids,
  setIds,
  label,
  displayComponent: DisplayComponent,
  useInfiniteQuery,
  getOptionLabel,
  CreateOneModal,
  UpdateOneModal,
  DeleteOneModal,
  disabled,
}: DataMultiSelectProps<T>) {
  const [
    createOneModalOpened,
    { open: openCreateOneModal, close: closeCreateOneModal },
  ] = useDisclosure(false);
  const [editOneModalOpened, setEditOneModalOpened] = useState({
    opened: false,
    id: "",
  });
  const [deleteOneModalOpened, setDeleteOneModalOpened] = useState({
    opened: false,
    id: "",
  });

  const [globalFilter, setGlobalFilter] = useDebouncedState("", 300);
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setSearch("");
      setGlobalFilter("");
    },
  });

  const handleCloseCreateOne = useCallback(() => {
    closeCreateOneModal();
    combobox.openDropdown();
  }, [closeCreateOneModal, combobox]);

  const handleCloseUpdateOne = useCallback(() => {
    setEditOneModalOpened({ opened: false, id: "" });
    combobox.openDropdown();
  }, [combobox]);

  const handleCloseDeleteOne = useCallback(() => {
    setDeleteOneModalOpened({ opened: false, id: "" });
    combobox.openDropdown();
  }, [combobox]);

  const handleValueSelect = (id: string) =>
    setIds(ids.includes(id) ? ids.filter((v) => v !== id) : [...ids, id]);

  const handleValueRemove = (id: string) => setIds(ids.filter((v) => v !== id));

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(globalFilter);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastOptionRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          void fetchNextPage().catch(console.error);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, isFetchingNextPage]
  );

  const values = ids.map((id) => (
    <Pill
      key={id}
      withRemoveButton={!disabled}
      onRemove={disabled ? undefined : () => handleValueRemove(id)}
    >
      <DisplayComponent id={id} />
    </Pill>
  ));

  const options = data?.pages.flatMap((page) =>
    page.items.map((item, index) => (
      <DataMultiSelectOption
        key={item.id}
        item={item}
        index={index}
        lastOptionRef={lastOptionRef}
        isLastItem={
          data?.pages &&
          data.pages[data.pages.length - 1]?.items.length === index + 1
        }
        ids={ids}
        getOptionLabel={getOptionLabel}
        UpdateOneModal={UpdateOneModal}
        DeleteOneModal={DeleteOneModal}
        combobox={combobox}
        setEditOneModalOpened={setEditOneModalOpened}
        setDeleteOneModalOpened={setDeleteOneModalOpened}
      />
    ))
  );

  return (
    <>
      <Combobox
        store={combobox}
        onOptionSubmit={disabled ? undefined : handleValueSelect}
        withinPortal={false}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            label={label}
            onClick={disabled ? undefined : () => combobox.openDropdown()}
            disabled={disabled}
          >
            <Pill.Group>
              {values}
              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={disabled ? undefined : () => combobox.openDropdown()}
                  value={search}
                  placeholder="Поиск..."
                  disabled={disabled}
                  onChange={(event) => {
                    const newValue = event.currentTarget.value;
                    setSearch(newValue);
                    setGlobalFilter(newValue);
                  }}
                  onKeyDown={(event) => {
                    if (disabled) return;
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      const lastValue = ids[ids.length - 1];
                      if (!lastValue) return;
                      handleValueRemove(lastValue);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <ScrollArea.Autosize type="scroll" mah={200}>
            <Combobox.Options>
              {isLoading ? (
                <Combobox.Empty>Загрузка...</Combobox.Empty>
              ) : isError ? (
                <Combobox.Empty>Ошибка загрузки</Combobox.Empty>
              ) : options && options.length > 0 ? (
                options
              ) : (
                <Combobox.Empty>
                  {CreateOneModal ? (
                    <Button
                      type="button"
                      leftSection={<IconPlus className="h-4 w-4" />}
                      variant="light"
                      fullWidth
                      onClick={() => {
                        openCreateOneModal();
                        combobox.closeDropdown();
                      }}
                    >
                      Создать &quot;{search}&quot;
                    </Button>
                  ) : (
                    "Нет результатов"
                  )}
                </Combobox.Empty>
              )}
            </Combobox.Options>
          </ScrollArea.Autosize>
        </Combobox.Dropdown>
      </Combobox>

      {CreateOneModal && (
        <CreateOneModal
          opened={createOneModalOpened}
          close={handleCloseCreateOne}
        />
      )}

      {UpdateOneModal && editOneModalOpened.id && (
        <UpdateOneModal
          id={editOneModalOpened.id}
          opened={editOneModalOpened.opened}
          close={handleCloseUpdateOne}
        />
      )}

      {DeleteOneModal && deleteOneModalOpened.id && (
        <DeleteOneModal
          id={deleteOneModalOpened.id}
          opened={deleteOneModalOpened.opened}
          close={handleCloseDeleteOne}
        />
      )}
    </>
  );
}

interface DataMultiSelectOptionProps<T> {
  item: T;
  index: number;
  lastOptionRef: (node: HTMLDivElement | null) => void;
  isLastItem: boolean;
  ids: string[];
  getOptionLabel: (item: T) => string;
  UpdateOneModal?: UpdateOneModal;
  DeleteOneModal?: DeleteOneModal;
  combobox: ComboboxStore;
  setEditOneModalOpened: Dispatch<
    SetStateAction<{
      opened: boolean;
      id: string;
    }>
  >;
  setDeleteOneModalOpened: Dispatch<
    SetStateAction<{
      opened: boolean;
      id: string;
    }>
  >;
}

function DataMultiSelectOption<T extends { id: string }>({
  item,
  index,
  lastOptionRef,
  isLastItem,
  ids,
  getOptionLabel,
  UpdateOneModal,
  DeleteOneModal,
  combobox,
  setEditOneModalOpened,
  setDeleteOneModalOpened,
}: DataMultiSelectOptionProps<T>) {
  return (
    <Combobox.Option
      value={item.id}
      key={item.id}
      ref={isLastItem ? lastOptionRef : null}
      active={ids.includes(item.id)}
    >
      <Group justify="space-between" w="100%">
        <Group gap="sm">
          {ids.includes(item.id) && <CheckIcon size={12} />}
          <span>{getOptionLabel(item)}</span>
        </Group>
        <Group gap="xs">
          {UpdateOneModal && (
            <ActionIcon
              size="xs"
              type="button"
              variant="transparent"
              onClick={(e) => {
                e.stopPropagation();
                combobox.closeDropdown();
                setEditOneModalOpened({
                  id: item.id,
                  opened: true,
                });
              }}
            >
              <IconPencil size={16} />
            </ActionIcon>
          )}
          {DeleteOneModal && (
            <ActionIcon
              size="xs"
              type="button"
              variant="transparent"
              c="red"
              onClick={(e) => {
                e.stopPropagation();
                combobox.closeDropdown();
                setDeleteOneModalOpened({
                  id: item.id,
                  opened: true,
                });
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Combobox.Option>
  );
}
