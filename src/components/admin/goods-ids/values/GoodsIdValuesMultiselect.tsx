import { DataMultiSelect } from "~/components/DataMultiselect";
import { api } from "~/trpc/react";
import { DisplayOneGoodsIdValue } from "./DisplayOneGoodsIdValue";
import { CreateOneGoodsIdValueModal } from "./CreateOneGoodsIdValue";
import { DeleteOneGoodsIdValueModal } from "./DeleteOneGoodsIdValue";
import { UpdateOneGoodsIdValueModal } from "./UpdateOneGoodsIdValue";

interface GoodsIdValuesMultiselectProps {
  ids: string[];
  setIds: (ids: string[]) => void;
  label?: string;
  parentId?: string;
  disabled?: boolean;
}

export function GoodsIdValuesMultiselect({
  ids,
  setIds,
  label,
  parentId,
  disabled,
}: GoodsIdValuesMultiselectProps) {
  const useIdValues = (globalFilter: string) =>
    api.ids.values.readManyInfinite.useInfiniteQuery(
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
      displayComponent={DisplayOneGoodsIdValue}
      useInfiniteQuery={useIdValues}
      getOptionLabel={(item) => item.value}
      CreateOneModal={{
        Component: CreateOneGoodsIdValueModal,
        onSuccess: async () => {},
      }}
      UpdateOneModal={{
        Component: UpdateOneGoodsIdValueModal,
        onSuccess: async () => {},
      }}
      DeleteOneModal={{
        Component: DeleteOneGoodsIdValueModal,
        onSuccess: async () => {},
      }}
      disabled={disabled}
    />
  );
}
