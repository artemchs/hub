"use client";

import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsTagName } from "./DisplayOneGoodsTagName";

interface GoodsTagsMultiselectProps {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  disabled?: boolean;
}

export function GoodsTagsMultiselect({
  ids,
  setIds,
  label,
  disabled,
}: GoodsTagsMultiselectProps) {
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
    <DataMultiSelect<{ id: string; name: string }>
      ids={ids}
      setIds={setIds}
      label={label}
      displayComponent={DisplayOneGoodsTagName}
      useInfiniteQuery={useTags}
      getOptionLabel={(item) => item.name}
      disabled={disabled}
    />
  );
}
