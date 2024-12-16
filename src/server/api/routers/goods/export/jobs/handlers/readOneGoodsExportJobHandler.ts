import { readOneGoodsExportJob } from "~/server/actions/goods/export/jobs/readOneGoodsExportJob";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodsExportJobSchema } from "~/utils/validation/goods/export/jobs";

export const readOneGoodsExportJobHandler = protectedProcedure
    .input(readOneGoodsExportJobSchema)
    .query(async ({ ctx, input }) => {
        try {
            return readOneGoodsExportJob({
                tx: ctx.db,
                payload: input,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to read goods export job");
        }
    });
