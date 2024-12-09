"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayOneGoodsAttributeValue } from "./DisplayOneGoodsAttributeValue";
import { CreateOneGoodsAttributeValueModal } from "./CreateOneGoodsAttributeValue";
import { UpdateOneGoodsAttributeValueModal } from "./UpdateOneGoodsAttributeValue";
import { DeleteOneGoodsAttributeValueModal } from "./DeleteOneGoodsAttributeValue";

interface GoodsAttributeValueComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
  disabled?: boolean;
  parentId?: string;
}

export function GoodsAttributeValueCombobox({
  id,
  setId,
  label,
  disabled,
  parentId,
}: GoodsAttributeValueComboboxProps) {
  const useAttributes = (globalFilter: string) =>
    api.attributes.values.readManyInfinite.useInfiniteQuery(
      {
        globalFilter,
        parentId: parentId ?? undefined,
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
      CreateOneModal={{
        Component: CreateOneGoodsAttributeValueModal,
        onSuccess: async () => {},
      }}
      UpdateOneModal={{
        Component: UpdateOneGoodsAttributeValueModal,
        onSuccess: async () => {},
      }}
      DeleteOneModal={{
        Component: DeleteOneGoodsAttributeValueModal,
        onSuccess: async () => {},
      }}
    />
  );
}
