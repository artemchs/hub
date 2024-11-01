import { createTRPCRouter } from "~/server/api/trpc";
import { goodsImportSchemasRouter } from "./schemas/goodsImportSchemasRouter";
import { createOneGoodsImportHandler } from "./handlers/createOneGoodsImportHandler";
import { readOneGoodsImportHandler } from "./handlers/readOneGoodsImportHandler";
import { readManyGoodsImportsHandler } from "./handlers/readManyGoodsImportsHandler";

export const goodsImportRouter = createTRPCRouter({
  schemas: goodsImportSchemasRouter,
  createOne: createOneGoodsImportHandler,
  readOne: readOneGoodsImportHandler,
  readMany: readManyGoodsImportsHandler,
});
