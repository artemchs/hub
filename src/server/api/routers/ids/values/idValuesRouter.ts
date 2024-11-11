import { createTRPCRouter } from "~/server/api/trpc";
import { createOneIdValueHandler } from "./handlers/createOneIdValueHandler";
import { readOneIdValueHandler } from "./handlers/readOneIdValueHandler";
import { updateOneIdValueHandler } from "./handlers/updateOneIdValueHandler";
import { readManyIdValuesInfiniteHandler } from "./handlers/readManyIdValuesHandler";
import { deleteOneIdValueHandler } from "./handlers/deleteOneIdValueHandler";

export const idValuesRouter = createTRPCRouter({
  createOne: createOneIdValueHandler,
  readOne: readOneIdValueHandler,
  updateOne: updateOneIdValueHandler,
  readManyInfinite: readManyIdValuesInfiniteHandler,
  deleteOne: deleteOneIdValueHandler,
});
