import { createTRPCRouter } from "../../trpc";
import { createOneGoodsIdHandler } from "./handlers/createOneGoodsIdHandler";
import { deleteOneGoodsIdHandler } from "./handlers/deleteOneGoodsIdHandler";
import { readManyGoodsIdsHandler } from "./handlers/readmanyGoodsIdsHandler";
import { readOneGoodsIdHandler } from "./handlers/readOneGoodsIdHandler";
import { updateOneGoodsIdHandler } from "./handlers/updateOneGoodsIdHandler";

export const idsRouter = createTRPCRouter({
  createOne: createOneGoodsIdHandler,
  readOne: readOneGoodsIdHandler,
  readMany: readManyGoodsIdsHandler,
  updateOne: updateOneGoodsIdHandler,
  deleteOne: deleteOneGoodsIdHandler,
});
