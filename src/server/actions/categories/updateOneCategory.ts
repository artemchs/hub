import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneCategoryInput } from "~/utils/validation/categories/updateOneCategory";
import { readOneCategory } from "./readOneCategory";

export const updateOneCategory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneCategoryInput;
}) => {
  await readOneCategory({ tx, payload: { id: payload.id } });

  return tx.goodsCategory.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
      description: payload.description,
      parentId: payload.parentId,
    },
  });
};
