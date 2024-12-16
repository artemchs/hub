import { updateOneGoodsExportJob } from "~/server/actions/goods/export/jobs/updateOneGoodsExportJob";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneGoodsExportJobSchema } from "~/utils/validation/goods/export/jobs";

export const updateOneGoodsExportJobHandler = protectedProcedure
    .input(updateOneGoodsExportJobSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            return updateOneGoodsExportJob({
                tx: ctx.db,
                payload: input,
            });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update goods export job");
        }
    });
