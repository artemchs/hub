import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodInput } from "~/utils/validation/goods/createOneGood";
import { readOneCategory } from "../categories/readOneCategory";
import { readOneAttributeValue } from "../attributes/values/readOneAttributeValue";
import { readOneIdValue } from "../ids/values/readOneIdValue";
import { readOneCharacteristic } from "../characteristics/readOneCharacteristic";
import { readOneCharacteristicValue } from "../characteristics/values/readOneCharacteristicValue";
import { readOneAttribute } from "../attributes/readOneAttribute";
import { readOneInternalFieldValue } from "../internal-fields/values/readOneInternalFieldValue";
import { readOneInternalField } from "../internal-fields/readOneInternalField";

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
    for (const { id, valueId } of payload.attributes) {
      await readOneAttribute({ tx, payload: { id } });
      await readOneAttributeValue({ tx, payload: { id: valueId } });
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

  if (payload.internalFields) {
    for (const { id, valueIds } of payload.internalFields) {
      await readOneInternalField({ tx, payload: { id } });

      for (const valueId of valueIds) {
        await readOneInternalFieldValue({ tx, payload: { id: valueId } });
      }
    }
  }

  return {
    mediaIds,
  };
};
