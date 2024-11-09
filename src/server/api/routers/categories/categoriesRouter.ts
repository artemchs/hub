import { createTRPCRouter } from "../../trpc";
import { createOneCategoryHandler } from "./handlers/createOneCategoryHandler";
import { deleteOneCategoryHandler } from "./handlers/deleteOneCategoryHandler";
import {
  readManyCategoriesHandler,
  readManyCategoriesInfiniteHandler,
} from "./handlers/readManyCategoriesHandler";
import { readOneCategoryHandler } from "./handlers/readOneCategoryHandler";
import { updateOneCategoryHandler } from "./handlers/updateOneCategoryHandler";

export const categoriesRouter = createTRPCRouter({
  createOne: createOneCategoryHandler,
  readOne: readOneCategoryHandler,
  readMany: readManyCategoriesHandler,
  readManyInfinite: readManyCategoriesInfiniteHandler,
  updateOne: updateOneCategoryHandler,
  deleteOne: deleteOneCategoryHandler,
});
