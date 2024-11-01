import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneCategoryInput } from "~/utils/validation/categories/deleteOneCategory";
import { readOneCategory } from "./readOneCategory";

export const deleteOneCategory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneCategoryInput;
}) => {
  await readOneCategory({ tx, payload });

  return tx.goodsCategory.delete({
    where: {
      id: payload.id,
    },
  });
};
