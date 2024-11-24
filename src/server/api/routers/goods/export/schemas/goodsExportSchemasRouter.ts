import { createTRPCRouter } from "~/server/api/trpc";
import { createOneGoodsExportSchemaHandler } from "./handlers/createOneGoodsExportSchemaHandler";
import { readOneGoodsExportSchemaHandler } from "./handlers/readOneGoodsExportSchemaHandler";
import { updateOneGoodsExportSchemaHandler } from "./handlers/updateOneGoodsExportSchemaHandler";
import { deleteOneGoodsExportSchemaHandler } from "./handlers/deleteOneGoodsExportSchemaHandler";
import {
  readManyGoodsExportSchemasHandler,
  readManyGoodsExportSchemasInfiniteHandler,
} from "./handlers/readManyGoodsExportSchemasHandler";

export const goodsExportSchemasRouter = createTRPCRouter({
  createOne: createOneGoodsExportSchemaHandler,
  readOne: readOneGoodsExportSchemaHandler,
  updateOne: updateOneGoodsExportSchemaHandler,
  deleteOne: deleteOneGoodsExportSchemaHandler,
  readMany: readManyGoodsExportSchemasHandler,
  readManyInfinite: readManyGoodsExportSchemasInfiniteHandler,
});
