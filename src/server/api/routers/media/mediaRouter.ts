import { createTRPCRouter } from "../../trpc";
import { createOneGoodsMediaHandler } from "./handlers/createOneGoodsMediaHandler";
import { deleteOneGoodsMediaHandler } from "./handlers/deleteOneGoodsMediaHandler";
import {
  readManyGoodsMediaHandler,
  readManyGoodsMediaInfiniteHandler,
} from "./handlers/readManyGoodsMediaHandler";
import { readOneGoodsMediaHandler } from "./handlers/readOneGoodsMediaHandler";
import { updateOneGoodsMediaHandler } from "./handlers/updateOneGoodsmediaHandler";

export const mediaRouter = createTRPCRouter({
  createOne: createOneGoodsMediaHandler,
  readOne: readOneGoodsMediaHandler,
  readMany: readManyGoodsMediaHandler,
  readManyInfinite: readManyGoodsMediaInfiniteHandler,
  updateOne: updateOneGoodsMediaHandler,
  deleteOne: deleteOneGoodsMediaHandler,
});
