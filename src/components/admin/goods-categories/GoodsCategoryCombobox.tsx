"use client";

import { api } from "~/trpc/react";
import { DisplayGoodsCategoryName } from "./DisplayGoodsCategoryName";
import { DataCombobox } from "~/components/DataCombobox";

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
  const useCategories = (globalFilter: string) =>
    api.categories.readManyInfinite.useInfiniteQuery(
      {
        globalFilter,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return (
    <DataCombobox
      id={id}
      setId={setId}
      label={label}
      displayComponent={DisplayGoodsCategoryName}
      useInfiniteQuery={useCategories}
      getOptionLabel={(item) => item.name}
    />
  );
}
