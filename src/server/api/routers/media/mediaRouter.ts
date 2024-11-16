import { createTRPCRouter } from "../../trpc";
import { createOneGoodsMediaHandler } from "./handlers/createOneGoodsMediaHandler";
import { deleteOneGoodsMediaHandler } from "./handlers/deleteOneGoodsMediaHandler";
import { generateOneUploadUrlHandler } from "./handlers/generateOneUploadUrlHandler";
import {
  readManyGoodsMediaHandler,
  readManyGoodsMediaInfiniteHandler,
} from "./handlers/readManyGoodsMediaHandler";
import { readOneGoodsMediaHandler } from "./handlers/readOneGoodsMediaHandler";
import { updateOneGoodsMediaHandler } from "./handlers/updateOneGoodsmediaHandler";
import { generateManyUploadUrlsHandler } from "./handlers/generateManyUploadUrlsHandler";

export const mediaRouter = createTRPCRouter({
  generateOneUploadUrl: generateOneUploadUrlHandler,
  generateManyUploadUrls: generateManyUploadUrlsHandler,
  createOne: createOneGoodsMediaHandler,
  readOne: readOneGoodsMediaHandler,
  readMany: readManyGoodsMediaHandler,
  readManyInfinite: readManyGoodsMediaInfiniteHandler,
  updateOne: updateOneGoodsMediaHandler,
  deleteOne: deleteOneGoodsMediaHandler,
});
