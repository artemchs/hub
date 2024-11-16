"use client";

import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsCharacteristicValue } from "./DisplayOneGoodsCharacteristicValue";
import { CreateOneGoodsCharacteristicValueModal } from "./CreateOneGoodsCharacteristicValue";
import { UpdateOneGoodsCharacteristicValueModal } from "./UpdateOneGoodsCharacteristicValue";
import { DeleteOneGoodsCharacteristicValueModal } from "./DeleteOneGoodsCharacteristicValue";

interface GoodsCharacteristicValuesMultiselectProps {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  parentId?: string;
  disabled?: boolean;
}

export function GoodsCharacteristicValuesMultiselect({
  ids,
  setIds,
  label,
  parentId,
  disabled,
}: GoodsCharacteristicValuesMultiselectProps) {
  const useCharacteristicValues = (globalFilter: string) =>
    api.characteristics.values.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsCharacteristicValue}
      useInfiniteQuery={useCharacteristicValues}
      getOptionLabel={(item) => item.value}
      CreateOneModal={CreateOneGoodsCharacteristicValueModal}
      UpdateOneModal={UpdateOneGoodsCharacteristicValueModal}
      DeleteOneModal={DeleteOneGoodsCharacteristicValueModal}
      disabled={disabled}
    />
  );
}
