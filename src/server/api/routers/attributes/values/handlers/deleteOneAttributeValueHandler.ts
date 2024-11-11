import { deleteOneAttributeValue } from "~/server/actions/attributes/values/deleteOneAttributeValue";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneAttributeValueSchema } from "~/utils/validation/attributes/values/deleteOneAttributeValue";

export const deleteOneAttributeValueHandler = protectedProcedure
  .input(deleteOneAttributeValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneAttributeValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete attribute value");
    }
  });
