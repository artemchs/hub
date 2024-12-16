import {
    readManyGoodsExportJobs,
    readManyGoodsExportJobsInfinite,
} from "~/server/actions/goods/export/jobs/readManyGoodsExportJobs";
import { protectedProcedure } from "~/server/api/trpc";
import {
    readManyGoodsExportJobsInfiniteSchema,
    readManyGoodsExportJobsSchema,
} from "~/utils/validation/goods/export/jobs";

export const readManyGoodsExportJobsHandler = protectedProcedure
    .input(readManyGoodsExportJobsSchema)
    .query(async ({ ctx, input }) => {
        try {
            return readManyGoodsExportJobs({
                tx: ctx.db,
                payload: input,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to read goods export jobs");
        }
    });

export const readManyGoodsExportJobsInfiniteHandler = protectedProcedure
    .input(readManyGoodsExportJobsInfiniteSchema)
    .query(async ({ ctx, input }) => {
        try {
            return readManyGoodsExportJobsInfinite({
                tx: ctx.db,
                payload: input,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to read goods export jobs");
        }
    });
