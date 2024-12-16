import { createOneGoodsExportJob } from "~/server/actions/goods/export/jobs/createOneGoodsExportJob";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodsExportJobSchema } from "~/utils/validation/goods/export/jobs";

export const createOneGoodsExportJobHandler = protectedProcedure
    .input(createOneGoodsExportJobSchema)
    .mutation(async ({ input, ctx }) => {
        try {
            return createOneGoodsExportJob({
                tx: ctx.db,
                payload: input,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create goods export job");
        }
    });
