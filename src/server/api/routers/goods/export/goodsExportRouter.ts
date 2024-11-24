import { createTRPCRouter } from "~/server/api/trpc";
import { createOneGoodsExportHandler } from "./handlers/createOneGoodsExportHandler";
import { readOneGoodsExportHandler } from "./handlers/readOneGoodsExportHandler";
import { readManyGoodsExportsHandler } from "./handlers/readManyGoodsExportsHandler";
import { goodsExportSchemasRouter } from "./schemas/goodsExportSchemasRouter";

export const goodsExportRouter = createTRPCRouter({
  schemas: goodsExportSchemasRouter,
  createOne: createOneGoodsExportHandler,
  readOne: readOneGoodsExportHandler,
  readMany: readManyGoodsExportsHandler,
});