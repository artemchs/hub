import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodInput } from "~/utils/validation/goods/createOneGood";
import { checkDbRecordsForGood } from "./checkDbRecordsForGood";

export const createOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodInput;
}) => {
  const { mediaIds } = await checkDbRecordsForGood({ tx, payload });

  return tx.good.create({
    data: {
      name: payload.name,
      sku: payload.sku,
      description: payload.description,
      fullPrice: payload.fullPrice,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
      attributeValues: {
        connect: payload.attributeValueIds?.map((id) => ({ id })),
      },
      idValues: {
        connect: payload.idValueIds?.map((id) => ({ id })),
      },
      mediaToGood: {
        createMany: {
          data: mediaIds.map((id, index) => ({
            mediaId: id,
            index,
          })),
        },
      },
    },
  });
};
