import { createOneInternalFieldSchema } from "~/utils/validation/internal-fields/createOneInternalField";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { internalFieldValuesRouter } from "./values/internalFieldValuesRouter";
import { createOneInternalField } from "~/server/actions/internal-fields/createOneInternalField";
import { readOneInternalField } from "~/server/actions/internal-fields/readOneInternalField";
import { readOneInternalFieldSchema } from "~/utils/validation/internal-fields/readOneInternalField";
import { updateOneInternalFieldSchema } from "~/utils/validation/internal-fields/updateOneInternalField";
import { updateOneInternalField } from "~/server/actions/internal-fields/updateOneInternalField";
import { readManyInternalFields, readManyInternalFieldsInfinite } from "~/server/actions/internal-fields/readManyInternalFields";
import { readManyInternalFieldsInfiniteSchema, readManyInternalFieldsSchema } from "~/utils/validation/internal-fields/readManyInternalFields";
import { deleteOneInternalField } from "~/server/actions/internal-fields/deleteOneInternalField";

export const internalFieldsRouter = createTRPCRouter({
  values: internalFieldValuesRouter,

  createOne: protectedProcedure
    .input(createOneInternalFieldSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await createOneInternalField({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create internal field");
      }
    }),

  readOne: protectedProcedure
    .input(readOneInternalFieldSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await readOneInternalField({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to read internal field");
      }
    }),

  updateOne: protectedProcedure
    .input(updateOneInternalFieldSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await updateOneInternalField({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update internal field");
      }
    }),

  readMany: protectedProcedure
    .input(readManyInternalFieldsSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await readManyInternalFields({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to read internal fields");
      }
    }),

  readManyInfinite: protectedProcedure
    .input(readManyInternalFieldsInfiniteSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await readManyInternalFieldsInfinite({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to read internal fields");
      }
    }),

  deleteOne: protectedProcedure
    .input(readOneInternalFieldSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await deleteOneInternalField({ tx: ctx.db, payload: input });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete internal field");
      }
    }),
});
