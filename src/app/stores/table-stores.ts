import { goodsAttributesColumns } from "../admin/attributes/_components/table/columns";
import { goodsCategoriesColumns } from "../admin/categories/_components/table/columns";
import { goodsCharacteristicsColumns } from "../admin/characteristics/_components/table/columns";
import { goodsColumns } from "../admin/goods/_components/table/columns";
import { goodsImportSchemasColumns } from "../admin/goods/import/schemas/_components/columns";
import { goodsIdsColumns } from "../admin/ids/_components/table/columns";
import { goodsMediaColumns } from "../admin/media/_components/table/columns";
import { createTableStore } from "./create-table-store";

export const useGoodsTable = createTableStore("goods", goodsColumns);

export const useGoodsCategoriesTable = createTableStore(
  "goods-categories",
  goodsCategoriesColumns
);

export const useGoodsIdsTable = createTableStore("goods-ids", goodsIdsColumns);

export const useGoodsCharacteristicsTable = createTableStore(
  "goods-characteristics",
  goodsCharacteristicsColumns
);

export const useGoodsAttributesTable = createTableStore(
  "goods-attributes",
  goodsAttributesColumns
);

export const useGoodsMediaTable = createTableStore(
  "goods-media",
  goodsMediaColumns
);

export const useGoodsImportSchemasTable = createTableStore(
  "goods-import-schemas",
  goodsImportSchemasColumns
);
