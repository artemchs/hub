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
      sku: payload.sku,
      description: payload.description,
      fullPrice: payload.fullPrice,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
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
      attributeToGood: payload.attributes
        ? {
            createMany: {
              data: payload.attributes.map(({ id, valueId }, index) => ({
                attributeId: id,
                valueId,
                index,
              })),
            },
          }
        : undefined,
      characteristicToGood: payload.characteristics
        ? {
            createMany: {
              data: payload.characteristics.map(({ id, valueIds }, index) => ({
                characteristicId: id,
                characteristicValues: {
                  connect: valueIds.map((id) => ({ id })),
                },
                index,
              })),
            },
          }
        : undefined,
    },
  });
};
