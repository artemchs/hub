import { updateOneAttributeValue } from "~/server/actions/attributes/values/updateOneAttributeValue";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneAttributeValueSchema } from "~/utils/validation/attributes/values/updateOneAttributeValue";

export const updateOneAttributeValueHandler = protectedProcedure
  .input(updateOneAttributeValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneAttributeValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update attribute value");
    }
  });
