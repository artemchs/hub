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
  const { mediaIds } = await checkDbRecordsForGood({ tx, payload });

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
        createMany: {
          data: mediaIds.map((id, index) => ({
            mediaId: id,
            index,
          })),
        },
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
        createMany: payload.characteristics
          ? {
              data: payload.characteristics.map(({ id, valueIds }, index) => ({
                characteristicId: id,
                characteristicValues: {
                  connect: valueIds.map((id) => ({ id })),
                },
                index,
              })),
            }
          : undefined,
      },
    },
  });
};
