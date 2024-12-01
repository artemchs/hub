"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsInternalFieldName } from "./DisplayOneGoodsInternalFieldName";

interface GoodsInternalFieldComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsInternalFieldCombobox({
  id,
  setId,
  label,
}: GoodsInternalFieldComboboxProps) {
  const useInternalFields = (globalFilter: string) =>
    api.internalFields.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsInternalFieldName}
      useInfiniteQuery={useInternalFields}
      getOptionLabel={(item) => item.name}
    />
  );
}
