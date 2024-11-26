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
  await checkDbRecordsForGood({ tx, payload });

  return tx.good.create({
    data: {
      name: payload.name,
      sku: payload.sku,
      description: payload.description,
      fullPrice: payload.fullPrice,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
      idValues: {
        connect: payload.idValueIds?.map((id) => ({ id })),
      },
      mediaToGood: payload.mediaKeys
        ? {
            create: payload.mediaKeys?.map((key, index) => ({
              index,
              media: {
                connectOrCreate: {
                  where: {
                    key,
                  },
                  create: {
                    key,
                    name: key,
                  },
                },
              },
            })),
          }
        : undefined,
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
            create: payload.characteristics.map(({ id, valueIds }, index) => ({
              characteristicId: id,
              values: {
                connect: valueIds.map((id) => ({ id })),
              },
              index,
            })),
          }
        : undefined,
      tags: payload.tagIds
        ? {
            connect: payload.tagIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });
};
