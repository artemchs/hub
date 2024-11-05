import { goodsIdsColumns } from "../admin/ids/_components/table/columns";
import { createTableStore } from "./create-table-store";

export const useGoodsIdsTable = createTableStore("goods-ids", goodsIdsColumns);
