"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsImportSchemaName } from "./DisplayOneGoodsImportSchemaName";

interface GoodsImportSchemaComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsImportSchemaCombobox({
  id,
  setId,
  label,
}: GoodsImportSchemaComboboxProps) {
  const useGoodsImportSchemas = (globalFilter: string) =>
    api.goods.import.schemas.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsImportSchemaName}
      useInfiniteQuery={useGoodsImportSchemas}
      getOptionLabel={(item) => item.name}
    />
  );
}
