import { createOneInternalFieldValue } from "~/server/actions/internal-fields/values/createOneInternalFieldValue";
import { deleteOneInternalFieldValue } from "~/server/actions/internal-fields/values/deleteOneInternalFieldValue";
import { readManyInternalFieldValuesInfinite } from "~/server/actions/internal-fields/values/readManyInternalFieldValues";
import { readOneInternalFieldValue } from "~/server/actions/internal-fields/values/readOneInternalFieldValue";
import { updateOneInternalFieldValue } from "~/server/actions/internal-fields/values/updateOneInternalFieldValue";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createOneInternalFieldValueSchema } from "~/utils/validation/internal-fields/values/createOneInternalFieldValue";
import { readManyInternalFieldValuesInfiniteSchema } from "~/utils/validation/internal-fields/values/readManyInternalFieldValues";
import { readOneInternalFieldValueSchema } from "~/utils/validation/internal-fields/values/readOneInternalFieldValue";
import { updateOneInternalFieldValueSchema } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";

export const internalFieldValuesRouter = createTRPCRouter({
  createOne: protectedProcedure
    .input(createOneInternalFieldValueSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await createOneInternalFieldValue({
          tx: ctx.db,
          payload: input,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create internal field value");
      }
    }),

  readOne: protectedProcedure
    .input(readOneInternalFieldValueSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await readOneInternalFieldValue({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to read internal field value");
      }
    }),

  updateOne: protectedProcedure
    .input(updateOneInternalFieldValueSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await updateOneInternalFieldValue({
          tx: ctx.db,
          payload: input,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update internal field value");
      }
    }),

  readManyInfinite: protectedProcedure
    .input(readManyInternalFieldValuesInfiniteSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await readManyInternalFieldValuesInfinite({
          tx: ctx.db,
          payload: input,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to read internal field values");
      }
    }),

  deleteOne: protectedProcedure
    .input(readOneInternalFieldValueSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await deleteOneInternalFieldValue({
          tx: ctx.db,
          payload: input,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete internal field value");
      }
    }),
});
