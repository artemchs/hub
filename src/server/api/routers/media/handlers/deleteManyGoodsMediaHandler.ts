import { deleteManyMedia } from "~/server/actions/media/deleteManyMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteManyMediaSchema } from "~/utils/validation/media/deleteManyMedia";

export const deleteManyGoodsMediaHandler = protectedProcedure
    .input(deleteManyMediaSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            return deleteManyMedia({ tx: ctx.db, payload: input });
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete many goods Media");
        }
    });
