"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsAttributeName } from "./DisplayOneGoodsAttributeName";

interface GoodsAttributeComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsAttributesCombobox({
  id,
  setId,
  label,
}: GoodsAttributeComboboxProps) {
  const useAttributes = (globalFilter: string) =>
    api.attributes.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsAttributeName}
      useInfiniteQuery={useAttributes}
      getOptionLabel={(item) => item.name}
    />
  );
}
