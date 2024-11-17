import { createTRPCRouter } from "~/server/api/trpc";
import { createOneGoodsImportSchemaHandler } from "./handlers/createOneGoodsImportSchemaHandler";
import { readOneGoodsImportSchemaHandler } from "./handlers/readOneGoodsImportSchemaHandler";
import {
  readManyGoodsImportSchemasHandler,
  readManyGoodsImportSchemasInfiniteHandler,
} from "./handlers/readManyGoodsImportSchemasHandler";
import { updateOneGoodsImportSchemaHandler } from "./handlers/updateOneGoodsImportSchemaHandler";
import { deleteOneGoodsImportSchemaHandler } from "./handlers/deleteOneGoodsImportSchemaHandler";

export const goodsImportSchemasRouter = createTRPCRouter({
  createOne: createOneGoodsImportSchemaHandler,
  readOne: readOneGoodsImportSchemaHandler,
  readMany: readManyGoodsImportSchemasHandler,
  readManyInfinite: readManyGoodsImportSchemasInfiniteHandler,
  updateOne: updateOneGoodsImportSchemaHandler,
  deleteOne: deleteOneGoodsImportSchemaHandler,
});
