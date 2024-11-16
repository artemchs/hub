"use client";

import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsAttributeValue } from "./DisplayOneGoodsAttributeValue";
import { CreateOneGoodsAttributeValueModal } from "./CreateOneGoodsAttributeValue";
import { UpdateOneGoodsAttributeValueModal } from "./UpdateOneGoodsAttributeValue";
import { DeleteOneGoodsAttributeValueModal } from "./DeleteOneGoodsAttributeValue";

interface GoodsAttributeValuesMultiselectProps {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  parentId?: string;
}

export function GoodsAttributeValuesMultiselect({
  ids,
  setIds,
  label,
  parentId,
}: GoodsAttributeValuesMultiselectProps) {
  const useAttributeValues = (globalFilter: string) =>
    api.attributes.values.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsAttributeValue}
      useInfiniteQuery={useAttributeValues}
      getOptionLabel={(item) => item.value}
      CreateOneModal={CreateOneGoodsAttributeValueModal}
      UpdateOneModal={UpdateOneGoodsAttributeValueModal}
      DeleteOneModal={DeleteOneGoodsAttributeValueModal}
    />
  );
}
