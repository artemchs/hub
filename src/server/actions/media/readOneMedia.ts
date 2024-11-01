import { type PrismaTransaction } from "~/server/db";
import { type ReadOneMediaInput } from "~/utils/validation/media/readOneMedia";

export const readOneMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneMediaInput;
}) => {
  const media = await tx.goodsMedia.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
};
