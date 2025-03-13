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
import {
    generateManyUploadUrlsHandler,
    generateManyUploadUrlsWithKeysHandler,
} from "./handlers/generateManyUploadUrlsHandler";
import { createManyGoodsMediaHandler } from "./handlers/createManyGoodsMediaHandler";
import { deleteManyGoodsMediaHandler } from "./handlers/deleteManyGoodsMediaHandler";

export const mediaRouter = createTRPCRouter({
    generateOneUploadUrl: generateOneUploadUrlHandler,
    generateManyUploadUrls: generateManyUploadUrlsHandler,
    generateManyUploadUrlsWithKeys: generateManyUploadUrlsWithKeysHandler,
    createOne: createOneGoodsMediaHandler,
    createMany: createManyGoodsMediaHandler,
    readOne: readOneGoodsMediaHandler,
    readMany: readManyGoodsMediaHandler,
    readManyInfinite: readManyGoodsMediaInfiniteHandler,
    updateOne: updateOneGoodsMediaHandler,
    deleteOne: deleteOneGoodsMediaHandler,
    deleteMany: deleteManyGoodsMediaHandler,
});
