import { createOneGoodsImportSchemaSchema } from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";
import { type GoodsImportSchema } from "@prisma/client";

export const parseGoodsImportSchema = (
  goodsImportSchema: GoodsImportSchema
) => {
  try {
    if (!goodsImportSchema.schema) {
      throw new Error("Goods import schema is required");
    }

    const schema = goodsImportSchema.schema.valueOf();

    const parsed =
      createOneGoodsImportSchemaSchema.shape.schema.safeParse(schema);

    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Unsuccessful parsing of goods import schema");
    }

    return parsed.data;
  } catch (error) {
    console.error(error);
    throw new Error("Could not validate and parse goods import schema");
  }
};
