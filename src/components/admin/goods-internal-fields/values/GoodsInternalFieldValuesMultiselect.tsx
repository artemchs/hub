"use client";

import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsInternalFieldValue } from "./DisplayOneGoodsInternalFieldValue";
import { CreateOneGoodsInternalFieldValueModal } from "./CreateOneGoodsInternalFieldValue";
import { UpdateOneGoodsInternalFieldValueModal } from "./UpdateOneGoodsInternalFieldValue";
import { DeleteOneGoodsInternalFieldValueModal } from "./DeleteOneGoodsInternalFieldValue";

interface GoodsInternalFieldValuesMultiselectProps {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  parentId?: string;
  disabled?: boolean;
}

export function GoodsInternalFieldValuesMultiselect({
  ids,
  setIds,
  label,
  parentId,
  disabled,
}: GoodsInternalFieldValuesMultiselectProps) {
  const useInternalFieldValues = (globalFilter: string) =>
    api.internalFields.values.readManyInfinite.useInfiniteQuery(
      {
        globalFilter,
        parentId,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return (
    <DataMultiSelect<{ id: string; value: string }>
      ids={ids}
      setIds={setIds}
      label={label}
      displayComponent={DisplayOneGoodsInternalFieldValue}
      useInfiniteQuery={useInternalFieldValues}
      getOptionLabel={(item) => item.value}
      CreateOneModal={{
        Component: CreateOneGoodsInternalFieldValueModal,
        onSuccess: async () => {},
      }}
      UpdateOneModal={{
        Component: UpdateOneGoodsInternalFieldValueModal,
        onSuccess: async () => {},
      }}
      DeleteOneModal={{
        Component: DeleteOneGoodsInternalFieldValueModal,
        onSuccess: async () => {},
      }}
      disabled={disabled}
    />
  );
}
