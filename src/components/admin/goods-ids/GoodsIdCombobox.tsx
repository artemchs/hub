"use client";

import { api } from "~/trpc/react";
import { DataCombobox } from "~/components/DataCombobox";
import { DisplayGoodsIdName } from "./DisplayGoodsIdName";
import { CreateGoodsIdModal } from "./CreateGoodsId";
import { UpdateGoodsIdModal } from "./UpdateGoodsId";
import { DeleteGoodsIdModal } from "./DeleteGoodsId";

interface GoodsIdComboboxProps {
  id: string | null;
  setId: (id: string | null) => void;
  label?: string;
}

export function GoodsIdCombobox({ id, setId, label }: GoodsIdComboboxProps) {
  const useIds = (globalFilter: string) =>
    api.ids.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayGoodsIdName}
      useInfiniteQuery={useIds}
      getOptionLabel={(item) => item.name}
      CreateOneModal={{
        Component: CreateGoodsIdModal,
        onSuccess: async () => {},
      }}
      UpdateOneModal={{
        Component: UpdateGoodsIdModal,
        onSuccess: async () => {},
      }}
      DeleteOneModal={{
        Component: DeleteGoodsIdModal,
        onSuccess: async () => {},
      }}
    />
  );
}
