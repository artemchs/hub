"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsExportSchemaName } from "./DisplayOneGoodsExportSchemaName";

interface GoodsExportSchemaComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
  withAsterisk?: boolean;
}

export function GoodsExportSchemaCombobox({
  id,
  setId,
  label,
  withAsterisk,
}: GoodsExportSchemaComboboxProps) {
  const useGoodsExportSchemas = (globalFilter: string) =>
    api.goods.export.schemas.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsExportSchemaName}
      useInfiniteQuery={useGoodsExportSchemas}
      getOptionLabel={(item) => item.name}
    />
  );
}
