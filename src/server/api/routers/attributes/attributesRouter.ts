import { createTRPCRouter } from "../../trpc";
import { createOneGoodsAttributeHandler } from "./handlers/createOneGoodsAttributeHandler";
import { deleteOneGoodsAttributeHandler } from "./handlers/deleteOneGoodsAttributeHandler";
import {
  readManyGoodsAttributesHandler,
  readManyGoodsAttributesInfiniteHandler,
} from "./handlers/readManyGoodsAttributesHandler";
import { readOneGoodsAttributeHandler } from "./handlers/readOneGoodsAttributeHandler";
import { updateOneGoodsAttributeHandler } from "./handlers/updateOneGoodsAttributeHandler";
import { attributeValuesRouter } from "./values/attributeValuesRouter";

export const attributesRouter = createTRPCRouter({
  createOne: createOneGoodsAttributeHandler,
  readOne: readOneGoodsAttributeHandler,
  readMany: readManyGoodsAttributesHandler,
  readManyInfinite: readManyGoodsAttributesInfiniteHandler,
  updateOne: updateOneGoodsAttributeHandler,
  deleteOne: deleteOneGoodsAttributeHandler,
  values: attributeValuesRouter,
});
