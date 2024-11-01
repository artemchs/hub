import { type PrismaTransaction } from "~/server/db";
import { type ReadOneCategoryInput } from "~/utils/validation/categories/readOneCategory";

export const readOneCategory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneCategoryInput;
}) => {
  const category = await tx.goodsCategory.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};
