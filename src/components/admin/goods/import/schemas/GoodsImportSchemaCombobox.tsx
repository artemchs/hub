"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsImportSchemaName } from "./DisplayOneGoodsImportSchemaName";

interface GoodsImportSchemaComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
  withAsterisk?: boolean;
}

export function GoodsImportSchemaCombobox({
  id,
  setId,
  label,
  withAsterisk,
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
      withAsterisk={withAsterisk}
      id={id}
      setId={setId}
      label={label}
      displayComponent={DisplayOneGoodsImportSchemaName}
      useInfiniteQuery={useGoodsImportSchemas}
      getOptionLabel={(item) => item.name}
    />
  );
}
