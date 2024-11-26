"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsTagName } from "./DisplayOneGoodsTagName";

interface GoodsTagComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsTagCombobox({ id, setId, label }: GoodsTagComboboxProps) {
  const useTags = (globalFilter: string) =>
    api.tags.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsTagName}
      useInfiniteQuery={useTags}
      getOptionLabel={(item) => item.name}
    />
  );
}
