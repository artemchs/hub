"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsCharacteristicName } from "./DisplayOneGoodsCharacteristicName";

interface GoodsCharacteristicComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsCharacteristicCombobox({
  id,
  setId,
  label,
}: GoodsCharacteristicComboboxProps) {
  const useCharacteristics = (globalFilter: string) =>
    api.characteristics.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsCharacteristicName}
      useInfiniteQuery={useCharacteristics}
      getOptionLabel={(item) => item.name}
    />
  );
}
