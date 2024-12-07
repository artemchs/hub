"use client";

import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsTagName } from "./DisplayOneGoodsTagName";
import { CreateOneGoodsTagModal } from "./CreateOneGoodsTag";
import { UpdateOneGoodsTagModal } from "./UpdateOneGoodsTag";
import { DeleteOneGoodsTagModal } from "./DeleteOneGoodsTagModal";

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
  const apiUtils = api.useUtils();

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
      CreateOneModal={{
        Component: CreateOneGoodsTagModal,
        onSuccess: async () => {},
      }}
      UpdateOneModal={{
        Component: UpdateOneGoodsTagModal,
        onSuccess: async () => {},
      }}
      DeleteOneModal={{
        Component: DeleteOneGoodsTagModal,
        onSuccess: async () => {},
      }}
    />
  );
}
