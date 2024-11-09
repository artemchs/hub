"use client";

import { useState, useRef, useCallback } from "react";
import {
  CloseButton,
  Combobox,
  Input,
  InputBase,
  Loader,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { api } from "~/trpc/react";
import { useDebouncedState } from "@mantine/hooks";
import { DisplayGoodsCategoryName } from "./DisplayGoodsCategoryName";

interface GoodsCategoryComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsCategoryCombobox({
  id,
  setId,
  label,
}: GoodsCategoryComboboxProps) {
  const [globalFilter, setGlobalFilter] = useDebouncedState("", 300);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => setDropdownOpened(true),
  });

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    api.categories.readManyInfinite.useInfiniteQuery(
      {
        globalFilter,
      },
      {
        enabled: dropdownOpened,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

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
        {item.name}
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
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={
            isLoading ? (
              <Loader size={18} />
            ) : id ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setId("")}
                aria-label="Убрать выбранное значение"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents={id ? undefined : "none"}
        >
          {id ? (
            <DisplayGoodsCategoryName id={id} />
          ) : (
            <Input.Placeholder>Выберите значение</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          defaultValue={globalFilter}
          onChange={(event) => setGlobalFilter(event.currentTarget.value)}
          placeholder="Поиск..."
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
