"use client";

import { useRef, useCallback, useState, useId } from "react";
import {
  Button,
  CloseButton,
  Combobox,
  ComboboxStore,
  Input,
  InputBase,
  Loader,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import {
  CreateOneModal,
  DeleteOneModal,
  ModalProps,
  UpdateOneModal,
} from "~/types/modals";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Group } from "@mantine/core";

interface DataComboboxProps<T> {
  id: string | null;
  setId: (id: string | null) => void;
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
  disabled?: boolean;
  withAsterisk?: boolean;
  CreateOneModal?: {
    Component: CreateOneModal;
    onSuccess: ModalProps["onSuccess"];
  };
  UpdateOneModal?: {
    Component: UpdateOneModal;
    onSuccess: ModalProps["onSuccess"];
  };
  DeleteOneModal?: {
    Component: DeleteOneModal;
    onSuccess: ModalProps["onSuccess"];
  };
}

export function DataCombobox<T extends { id: string }>({
  id,
  setId,
  label,
  displayComponent: DisplayComponent,
  useInfiniteQuery,
  getOptionLabel,
  disabled,
  withAsterisk,
  CreateOneModal,
  DeleteOneModal,
  UpdateOneModal,
}: DataComboboxProps<T>) {
  const comboboxSearchId = useId();

  const [createOneModalOpened, setCreateOneModalOpened] = useState(false);
  const [editOneModalOpened, setEditOneModalOpened] = useState({
    opened: false,
    id: "",
  });
  const [deleteOneModalOpened, setDeleteOneModalOpened] = useState({
    opened: false,
    id: "",
  });

  const [globalFilter, setGlobalFilter] = useDebouncedState("", 300);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      // Add small delay to ensure the search input is mounted
      setTimeout(() => {
        const searchInput = document.querySelector(
          `[data-combobox-search="${comboboxSearchId}"]`
        );
        if (searchInput instanceof HTMLInputElement) {
          searchInput.focus();
        }
      }, 0);
    },
  });

  const handleCloseCreateOne = useCallback(() => {
    setCreateOneModalOpened(false);
    combobox.openDropdown();
  }, [combobox]);

  const handleCloseUpdateOne = useCallback(() => {
    setEditOneModalOpened({ opened: false, id: "" });
    combobox.openDropdown();
  }, [combobox]);

  const handleCloseDeleteOne = useCallback(() => {
    setDeleteOneModalOpened({ opened: false, id: "" });
    combobox.openDropdown();
  }, [combobox]);

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(globalFilter);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastOptionRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0]?.isIntersecting) {
            void fetchNextPage().catch(console.error);
          }
        }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, isFetchingNextPage]
  );

  const options = data?.pages.flatMap((page) =>
    page.items.map((item, index) => (
      <DataComboboxOption
        key={item.id}
        item={item}
        index={index}
        lastOptionRef={lastOptionRef}
        isLastItem={
          data?.pages &&
          data.pages[data.pages.length - 1]?.items.length === index + 1
        }
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
        withinPortal={false}
        onOptionSubmit={(val) => {
          setId(val);
          combobox.closeDropdown();
        }}
        shadow="sm"
      >
        <Combobox.Target>
          <InputBase
            withAsterisk={withAsterisk}
            label={label}
            component="button"
            type="button"
            pointer
            disabled={disabled}
            rightSection={
              isLoading ? (
                <Loader size={18} />
              ) : id ? (
                <CloseButton
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setId("")}
                  aria-label="Убрать выбранное значение"
                  disabled={disabled}
                />
              ) : (
                <Combobox.Chevron />
              )
            }
            onClick={() => {
              if (!disabled) {
                combobox.toggleDropdown();
              }
            }}
            rightSectionPointerEvents={id && !disabled ? undefined : "none"}
          >
            {id ? (
              <DisplayComponent id={id} />
            ) : (
              <Input.Placeholder>Выберите значение</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            data-combobox-search={comboboxSearchId}
            defaultValue={globalFilter}
            onChange={(event) => setGlobalFilter(event.currentTarget.value)}
            placeholder="Поиск..."
            autoFocus
            error={isError}
          />
          <Combobox.Options>
            {isLoading ? (
              <Combobox.Empty>Загрузка....</Combobox.Empty>
            ) : isError ? (
              <Combobox.Empty>Ошибка загрузки</Combobox.Empty>
            ) : (
              <ScrollArea.Autosize type="scroll" mah={200}>
                {options}
              </ScrollArea.Autosize>
            )}
          </Combobox.Options>
          {CreateOneModal && (
            <Button
              type="button"
              leftSection={<IconPlus size={16} />}
              variant="subtle"
              size="xs"
              fullWidth
              onClick={() => {
                setCreateOneModalOpened(true);
                combobox.closeDropdown();
              }}
            >
              Создать
            </Button>
          )}
        </Combobox.Dropdown>
      </Combobox>

      {CreateOneModal && (
        <CreateOneModal.Component
          opened={createOneModalOpened}
          close={handleCloseCreateOne}
          onSuccess={async () => {
            await CreateOneModal.onSuccess();
            handleCloseCreateOne();
          }}
        />
      )}

      {UpdateOneModal && editOneModalOpened.id && (
        <UpdateOneModal.Component
          id={editOneModalOpened.id}
          opened={editOneModalOpened.opened}
          close={handleCloseUpdateOne}
          onSuccess={async () => {
            await UpdateOneModal.onSuccess();
            handleCloseUpdateOne();
          }}
        />
      )}

      {DeleteOneModal && deleteOneModalOpened.id && (
        <DeleteOneModal.Component
          id={deleteOneModalOpened.id}
          opened={deleteOneModalOpened.opened}
          close={handleCloseDeleteOne}
          onSuccess={async () => {
            await DeleteOneModal.onSuccess();
            handleCloseDeleteOne();
          }}
        />
      )}
    </>
  );
}

function DataComboboxOption<T extends { id: string }>({
  item,
  index,
  lastOptionRef,
  isLastItem,
  getOptionLabel,
  UpdateOneModal,
  DeleteOneModal,
  combobox,
  setEditOneModalOpened,
  setDeleteOneModalOpened,
}: {
  item: T;
  index: number;
  lastOptionRef: (node: HTMLDivElement | null) => void;
  isLastItem: boolean;
  getOptionLabel: (item: T) => string;
  UpdateOneModal?: {
    Component: UpdateOneModal;
    onSuccess: ModalProps["onSuccess"];
  };
  DeleteOneModal?: {
    Component: DeleteOneModal;
    onSuccess: ModalProps["onSuccess"];
  };
  combobox: ComboboxStore;
  setEditOneModalOpened: (value: { opened: boolean; id: string }) => void;
  setDeleteOneModalOpened: (value: { opened: boolean; id: string }) => void;
}) {
  return (
    <Combobox.Option
      value={item.id}
      key={item.id}
      ref={isLastItem ? lastOptionRef : null}
    >
      <Group justify="space-between" w="100%">
        <span>{getOptionLabel(item)}</span>
        <Group gap="xs">
          {UpdateOneModal && (
            <ActionIcon
              size="xs"
              type="button"
              variant="transparent"
              color="dark"
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
              color="dark"
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
