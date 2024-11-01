import { type PrismaTransaction } from "~/server/db";
import { type CreateOneCategoryInput } from "~/utils/validation/categories/createOneCategory";
import { readOneCategory } from "./readOneCategory";

export const createOneCategory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneCategoryInput;
}) => {
  if (payload.parentId) {
    await readOneCategory({ tx, payload: { id: payload.parentId } });
  }

  return tx.goodsCategory.create({
    data: payload,
  });
};
