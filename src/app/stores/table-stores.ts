import { goodsCategoriesColumns } from "../admin/categories/_components/table/columns";
import { goodsIdsColumns } from "../admin/ids/_components/table/columns";
import { createTableStore } from "./create-table-store";

export const useGoodsCategoriesTable = createTableStore(
  "goods-categories",
  goodsCategoriesColumns
);

export const useGoodsIdsTable = createTableStore("goods-ids", goodsIdsColumns);
