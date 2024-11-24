import { createTRPCRouter } from "../../trpc";
import { createOneGoodsTagHandler } from "./handlers/createOneGoodsTagHandler";
import { deleteOneGoodsTagHandler } from "./handlers/deleteOneGoodsTagHandler";
import {
  readManyGoodsTagsHandler,
  readManyGoodsTagsInfiniteHandler,
} from "./handlers/readManyGoodsTagsHandler";
import { readOneGoodsTagHandler } from "./handlers/readOneGoodsTagHandler";
import { updateOneGoodsTagHandler } from "./handlers/updateOneGoodsTagHandler";

export const tagsRouter = createTRPCRouter({
  createOne: createOneGoodsTagHandler,
  readOne: readOneGoodsTagHandler,
  updateOne: updateOneGoodsTagHandler,
  readMany: readManyGoodsTagsHandler,
  readManyInfinite: readManyGoodsTagsInfiniteHandler,
  deleteOne: deleteOneGoodsTagHandler,
});
