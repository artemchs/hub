import { type PrismaTransaction } from "~/server/db";
import { type CreateManyMediaInput } from "~/utils/validation/media/createManyMedia";

export const createManyMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateManyMediaInput;
}) => {
  for (const file of payload.files) {
    const goodsMedia = await tx.goodsMedia.findUnique({
      where: {
        key: file.key,
      },
    });

    if (goodsMedia) {
      continue;
    }

    await tx.goodsMedia.create({
      data: {
        key: file.key,
        name: file.name,
      },
    });
  }
};
