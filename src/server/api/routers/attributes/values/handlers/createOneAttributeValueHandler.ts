import { createOneAttributeValue } from "~/server/actions/attributes/values/createOneAttributeValue";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneAttributeValueSchema } from "~/utils/validation/attributes/values/createOneAttributeValue";

export const createOneAttributeValueHandler = protectedProcedure
  .input(createOneAttributeValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneAttributeValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create attribute value");
    }
  });
