import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodInput } from "~/utils/validation/goods/readOneGood";

export const readOneGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodInput;
}) => {
  const good = await tx.good.findUnique({
    where: {
      id: payload.id,
    },
    include: {
      idValues: true,
      mediaToGood: {
        orderBy: {
          index: "asc",
        },
        include: {
          media: true,
        },
      },
      attributeToGood: {
        orderBy: {
          index: "asc",
        },
      },
      characteristicToGood: {
        orderBy: {
          index: "asc",
        },
        include: {
          values: {
            orderBy: {
              value: "asc",
            },
          },
          characteristic: true,
        },
      },
      tags: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  if (!good) {
    throw new Error(`Good not found`);
  }

  return good;
};
