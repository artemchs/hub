import { createTRPCRouter } from "~/server/api/trpc";
import { createOneGoodsExportJobHandler } from "./handlers/createOneGoodsExportJobHandler";
import { readOneGoodsExportJobHandler } from "./handlers/readOneGoodsExportJobHandler";
import {
    readManyGoodsExportJobsHandler,
    readManyGoodsExportJobsInfiniteHandler,
} from "./handlers/readManyGoodsExportJobsHandler";
import { updateOneGoodsExportJobHandler } from "./handlers/updateOneGoodsExportJobHandler";
import { deleteOneGoodsExportJobHandler } from "./handlers/deleteOneGoodsExportJobHandler";

export const goodsExportJobsRouter = createTRPCRouter({
    createOne: createOneGoodsExportJobHandler,
    readOne: readOneGoodsExportJobHandler,
    readMany: readManyGoodsExportJobsHandler,
    readManyInfinite: readManyGoodsExportJobsInfiniteHandler,
    updateOne: updateOneGoodsExportJobHandler,
    deleteOne: deleteOneGoodsExportJobHandler,
});
