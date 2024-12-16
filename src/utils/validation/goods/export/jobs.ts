import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../../readMany";

// Schema for creating a goods export job
export const createOneGoodsExportJobSchema = z.object({
    name: z.string().min(1),
    schedule: z.string().min(1),
    schemaId: z.string().min(1),
});

export type CreateOneGoodsExportJobInput = z.infer<
    typeof createOneGoodsExportJobSchema
>;

// Schema for reading a single goods export job
export const readOneGoodsExportJobSchema = z.object({
    id: z.string().min(1),
});

export type ReadOneGoodsExportJobInput = z.infer<
    typeof readOneGoodsExportJobSchema
>;

// Schema for reading multiple goods export jobs
export const readManyGoodsExportJobsSchema = z.object({
    ...readManySchema.shape,
});

export type ReadManyGoodsExportJobsInput = z.infer<
    typeof readManyGoodsExportJobsSchema
>;

// Schema for reading multiple goods export jobs with infinite scrolling
export const readManyGoodsExportJobsInfiniteSchema = z.object({
    ...readManyInfiniteSchema.shape,
});

export type ReadManyGoodsExportJobsInfiniteInput = z.infer<
    typeof readManyGoodsExportJobsInfiniteSchema
>;

// Schema for updating a goods export job
export const updateOneGoodsExportJobSchema = z.object({
    ...createOneGoodsExportJobSchema.shape,
    id: z.string().min(1),
});

export type UpdateOneGoodsExportJobInput = z.infer<
    typeof updateOneGoodsExportJobSchema
>;

// Schema for deleting a goods export job
export const deleteOneGoodsExportJobSchema = z.object({
    id: z.string().min(1),
});

export type DeleteOneGoodsExportJobInput = z.infer<
    typeof deleteOneGoodsExportJobSchema
>;
