"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayGoodsIdName } from "./DisplayGoodsIdName";

interface GoodsIdComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsIdCombobox({ id, setId, label }: GoodsIdComboboxProps) {
  const useIds = (globalFilter: string) =>
    api.ids.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayGoodsIdName}
      useInfiniteQuery={useIds}
      getOptionLabel={(item) => item.name}
    />
  );
}
