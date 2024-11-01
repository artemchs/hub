import { createTRPCRouter } from "../../trpc";
import { createOneCategoryHandler } from "./handlers/createOneCategoryHandler";
import { deleteOneCategoryHandler } from "./handlers/deleteOneCategoryHandler";
import { readManyCategoriesHandler } from "./handlers/readManyCategoriesHandler";
import { readOneCategoryHandler } from "./handlers/readOneCategoryHandler";
import { updateOneCategoryHandler } from "./handlers/updateOneCategoryHandler";

export const categoriesRouter = createTRPCRouter({
  createOne: createOneCategoryHandler,
  readOne: readOneCategoryHandler,
  readMany: readManyCategoriesHandler,
  updateOne: updateOneCategoryHandler,
  deleteOne: deleteOneCategoryHandler,
});
