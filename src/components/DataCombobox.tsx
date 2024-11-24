"use client";

import { useRef, useCallback } from "react";
import {
  CloseButton,
  Combobox,
  Input,
  InputBase,
  Loader,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

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
}: DataComboboxProps<T>) {
  const [globalFilter, setGlobalFilter] = useDebouncedState("", 300);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      // Add small delay to ensure the search input is mounted
      setTimeout(() => {
        const searchInput = document.querySelector(
          '[data-combobox-search="true"]'
        );
        if (searchInput instanceof HTMLInputElement) {
          searchInput.focus();
        }
      }, 0);
    },
  });

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
      <Combobox.Option
        value={item.id}
        key={item.id}
        ref={
          data?.pages &&
          data.pages[data.pages.length - 1]?.items.length === index + 1
            ? lastOptionRef
            : null
        }
      >
        {getOptionLabel(item)}
      </Combobox.Option>
    ))
  );

  return (
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
          data-combobox-search
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
      </Combobox.Dropdown>
    </Combobox>
  );
}
