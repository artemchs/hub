import { z } from "zod";

export const deleteManyMediaSchema = z.object({
    selectedRows: z.record(z.string(), z.boolean()),
});

export type DeleteManyMediaInput = z.infer<typeof deleteManyMediaSchema>;
