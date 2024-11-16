"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsAttributeValue } from "./DisplayOneGoodsAttributeValue";

interface GoodsAttributeValueComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
  disabled?: boolean;
}

export function GoodsAttributeValueCombobox({
  id,
  setId,
  label,
  disabled,
}: GoodsAttributeValueComboboxProps) {
  const useAttributes = (globalFilter: string) =>
    api.attributes.values.readManyInfinite.useInfiniteQuery(
      {
        globalFilter,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return (
    <DataCombobox
      disabled={disabled}
      id={id}
      setId={setId}
      label={label}
      displayComponent={DisplayOneGoodsAttributeValue}
      useInfiniteQuery={useAttributes}
      getOptionLabel={(item) => item.value}
    />
  );
}
