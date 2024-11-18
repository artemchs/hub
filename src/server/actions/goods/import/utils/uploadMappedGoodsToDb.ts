import { type PrismaTransaction } from "~/server/db";
import { type MappedGood } from "./mapJsonToGoods";
import { createOneGood } from "../../createOneGood";
import { Prisma } from "@prisma/client";
import { type CreateOneGoodInput } from "~/utils/validation/goods/createOneGood";
import { updateOneGood } from "../../updateOneGood";

export const uploadMappedGoodsToDb = async ({
  tx,
  mappedGoods,
}: {
  tx: PrismaTransaction;
  mappedGoods: MappedGood[];
}) => {
  try {
    for (const good of mappedGoods) {
      let price: Prisma.Decimal | undefined = good.price
        ? new Prisma.Decimal(good.price)
        : undefined;
      const fullPrice: Prisma.Decimal | undefined = good.fullPrice
        ? new Prisma.Decimal(good.fullPrice)
        : undefined;

      if (price === undefined && fullPrice !== undefined) {
        // Added flexibility to apply both types of discounts to the full price
        if (good.fixedDiscount !== undefined) {
          price = fullPrice.minus(new Prisma.Decimal(good.fixedDiscount ?? 0));
        }
        if (good.percentageDiscount !== undefined) {
          price = fullPrice.minus(
            fullPrice
              .times(new Prisma.Decimal(good.percentageDiscount ?? 0))
              .dividedBy(100)
          );
        }
      }

      const idValueIds: string[] = [];
      const idValues: {
        id: string;
        valueId: string;
      }[] = [];
      if (good.ids) {
        for (const { id, value } of good.ids) {
          const idValue = await tx.goodsIdValue.findFirst({
            where: {
              goodsIdId: id,
              value,
            },
          });

          if (!idValue) {
            const createdIdValue = await tx.goodsIdValue.create({
              data: {
                goodsIdId: id,
                value,
              },
            });

            if (createdIdValue) {
              idValueIds.push(createdIdValue.id);
              idValues.push({
                id: id,
                valueId: createdIdValue.id,
              });
            }
          } else {
            idValueIds.push(idValue.id);
            idValues.push({
              id: id,
              valueId: idValue.id,
            });
          }
        }
      }

      const attributes: {
        id: string;
        valueId: string;
      }[] = [];
      if (good.attributes) {
        for (const { id, value } of good.attributes) {
          const attributeValue = await tx.goodsAttributeValue.findFirst({
            where: {
              attributeId: id,
              value,
            },
          });

          if (!attributeValue) {
            const createdAttributeValue = await tx.goodsAttributeValue.create({
              data: {
                attributeId: id,
                value,
              },
            });

            if (createdAttributeValue) {
              attributes.push({
                id: id,
                valueId: createdAttributeValue.id,
              });
            }
          } else {
            attributes.push({
              id: id,
              valueId: attributeValue.id,
            });
          }
        }
      }

      const characteristics: {
        id: string;
        valueIds: string[];
      }[] = [];
      if (good.characteristics) {
        for (const { id, values } of good.characteristics) {
          const characteristicValues = await Promise.all(
            values.map(async (value) => {
              const characteristicValue =
                await tx.goodsCharacteristicValue.findFirst({
                  where: {
                    characteristicId: id,
                    value,
                  },
                });

              if (!characteristicValue) {
                const createdCharacteristicValue =
                  await tx.goodsCharacteristicValue.create({
                    data: {
                      characteristicId: id,
                      value,
                    },
                  });

                if (createdCharacteristicValue) {
                  return createdCharacteristicValue.id;
                }
              } else {
                return characteristicValue.id;
              }
            })
          );

          characteristics.push({
            id,
            valueIds: characteristicValues.filter(
              (value): value is string => value !== undefined
            ),
          });
        }
      }

      const payload: CreateOneGoodInput = {
        name: good.name ?? "",
        sku: good.sku ?? "",
        description: good.description ?? undefined,
        quantity: good.quantity ? Number(good.quantity) : undefined,
        price: price?.toNumber() ?? undefined,
        fullPrice: fullPrice?.toNumber() ?? undefined,
        mediaKeys: good.mediaKeys ?? undefined,
        idValueIds:
          idValueIds && idValueIds.length > 0 ? idValueIds : undefined,
        attributes:
          attributes && attributes.length > 0 ? attributes : undefined,
        characteristics:
          characteristics && characteristics.length > 0
            ? characteristics
            : undefined,
      };

      const existingGood = await tx.good.findFirst({
        where: {
          OR: idValues.map(({ id, valueId }) => ({
            idValues: {
              some: {
                goodsIdId: id,
                id: valueId,
              },
            },
          })),
        },
      });

      if (!existingGood) {
        const good = await createOneGood({ tx, payload });
        console.log("Successfully created good: ", good.id);
      } else {
        await updateOneGood({
          tx,
          payload: {
            ...payload,
            id: existingGood.id,
          },
        });
        console.log("Successfully updated good: ", existingGood.id);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload mapped goods to db");
  }
};
