import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneGoodInput } from "~/utils/validation/goods/updateOneGood";
import { readOneGood } from "./readOneGood";
import { checkDbRecordsForGood } from "./checkDbRecordsForGood";

export const updateOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneGoodInput;
}) => {
  await readOneGood({ tx, payload: { id: payload.id } });
  await checkDbRecordsForGood({ tx, payload });

  return tx.good.update({
    where: {
      id: payload.id,
    },
    data: {
      sku: payload.sku,
      description: payload.description,
      fullPrice: payload.fullPrice,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
      idValues: {
        set: payload.idValueIds?.map((id) => ({ id })),
      },
      mediaToGood: {
        deleteMany: {
          goodId: payload.id,
        },
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
      },
      attributeToGood: {
        deleteMany: {
          goodId: payload.id,
        },
        createMany: payload.attributes
          ? {
              data: payload.attributes.map(({ id, valueId }, index) => ({
                attributeId: id,
                valueId,
                index,
              })),
            }
          : undefined,
      },
      characteristicToGood: {
        deleteMany: {
          goodId: payload.id,
        },
        create: payload.characteristics
          ? payload.characteristics.map(({ id, valueIds }, index) => ({
              characteristicId: id,
              values: {
                connect: valueIds.map((id) => ({ id })),
              },
              index,
            }))
          : undefined,
      },
      tags: {
        set: payload.tagIds?.map((id) => ({ id })) ?? [],
      },
      internalFieldToGood: {
        deleteMany: {
          goodId: payload.id,
        },
        create: payload.internalFields
          ? payload.internalFields.map(({ id, valueIds }) => ({
              fieldId: id,
              values: {
                connect: valueIds.map((id) => ({ id })),
              },
            }))
          : undefined,
      },
    },
  });
};
