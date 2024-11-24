import { createTRPCRouter } from "../../trpc";
import { goodsImportRouter } from "./import/goodsImportRouter";
import { createOneGoodHandler } from "./handlers/createOneGoodHandler";
import { readOneGoodHandler } from "./handlers/readOneGoodHandler";
import {
  readManyGoodsHandler,
  readManyGoodsInfiniteHandler,
} from "./handlers/readManyGoodsHandler";
import { updateOneGoodHandler } from "./handlers/updateOneGoodHandler";
import { deleteOneGoodHandler } from "./handlers/deleteOneGoodHandler";
import { goodsExportRouter } from "./export/goodsExportRouter";

export const goodsRouter = createTRPCRouter({
  import: goodsImportRouter,
  export: goodsExportRouter,
  createOne: createOneGoodHandler,
  readOne: readOneGoodHandler,
  readMany: readManyGoodsHandler,
  readManyInfinite: readManyGoodsInfiniteHandler,
  updateOne: updateOneGoodHandler,
  deleteOne: deleteOneGoodHandler,
});
