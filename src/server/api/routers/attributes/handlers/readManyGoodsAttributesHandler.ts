import {
  readManyAttributes,
  readManyAttributesInfinite,
} from "~/server/actions/attributes/readManyAttributes";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyAttributesInfiniteSchema,
  readManyAttributesSchema,
} from "~/utils/validation/attributes/readManyAttributes";

export const readManyAttributesHandler = protectedProcedure
  .input(readManyAttributesSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyAttributes({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many attributes");
    }
  });

export const readManyAttributesInfiniteHandler = protectedProcedure
  .input(readManyAttributesInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyAttributesInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many attributes");
    }
  });
