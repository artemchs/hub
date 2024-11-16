import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodInput } from "~/utils/validation/goods/createOneGood";
import { readOneCategory } from "../categories/readOneCategory";
import { readOneAttributeValue } from "../attributes/values/readOneAttributeValue";
import { readOneIdValue } from "../ids/values/readOneIdValue";
import { readOneCharacteristic } from "../characteristics/readOneCharacteristic";
import { readOneCharacteristicValue } from "../characteristics/values/readOneCharacteristicValue";

export const checkDbRecordsForGood = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodInput;
}) => {
  const mediaIds: string[] = [];

  if (payload.categoryId) {
    await readOneCategory({ tx, payload: { id: payload.categoryId } });
  }

  if (payload.attributes) {
    for (const { id, valueIds } of payload.attributes) {
      await readOneAttributeValue({ tx, payload: { id } });

      for (const valueId of valueIds) {
        await readOneAttributeValue({ tx, payload: { id: valueId } });
      }
    }
  }

  if (payload.characteristics) {
    for (const { id, valueIds } of payload.characteristics) {
      await readOneCharacteristic({ tx, payload: { id } });

      for (const valueId of valueIds) {
        await readOneCharacteristicValue({ tx, payload: { id: valueId } });
      }
    }
  }

  if (payload.idValueIds) {
    for (const idValueId of payload.idValueIds) {
      await readOneIdValue({ tx, payload: { id: idValueId } });
    }
  }

  if (payload.mediaKeys) {
    for (const key of payload.mediaKeys) {
      const media = await tx.goodsMedia.findFirst({
        where: {
          key,
        },
      });

      if (!media) {
        throw new Error(`Media with key ${key} not found`);
      }

      mediaIds.push(media.id);
    }
  }

  return {
    mediaIds,
  };
};
