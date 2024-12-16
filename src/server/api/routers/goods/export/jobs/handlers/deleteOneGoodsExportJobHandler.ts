import { deleteOneGoodsExportJob } from "~/server/actions/goods/export/jobs/deleteOneGoodsExportJob";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneGoodsExportJobSchema } from "~/utils/validation/goods/export/jobs";

export const deleteOneGoodsExportJobHandler = protectedProcedure
    .input(deleteOneGoodsExportJobSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            await deleteOneGoodsExportJob({
                tx: ctx.db,
                payload: input,
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete goods export job");
        }
    });
