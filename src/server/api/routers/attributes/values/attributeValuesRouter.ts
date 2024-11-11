import { createTRPCRouter } from "~/server/api/trpc";
import { createOneAttributeValueHandler } from "./handlers/createOneAttributeValueHandler";
import { readOneAttributeValueHandler } from "./handlers/readOneAttributeValueHandler";
import { updateOneAttributeValueHandler } from "./handlers/updateOneAttributeValueHandler";
import { readManyAttributeValuesInfiniteHandler } from "./handlers/readManyAttributeValuesHandler";
import { deleteOneAttributeValueHandler } from "./handlers/deleteOneAttributeValueHandler";

export const attributeValuesRouter = createTRPCRouter({
  createOne: createOneAttributeValueHandler,
  readOne: readOneAttributeValueHandler,
  updateOne: updateOneAttributeValueHandler,
  readManyInfinite: readManyAttributeValuesInfiniteHandler,
  deleteOne: deleteOneAttributeValueHandler,
});
