import { createTRPCRouter } from "~/server/api/trpc";
import { createOneCharacteristicValueHandler } from "./handlers/createOneCharacteristicValueHandler";
import { readOneCharacteristicValueHandler } from "./handlers/readOneCharacteristicValueHandler";
import { updateOneCharacteristicValueHandler } from "./handlers/updateOneCharacteristicValueHandler";
import { readManyCharacteristicValuesInfiniteHandler } from "./handlers/readManyCharacteristicValuesHandler";
import { deleteOneCharacteristicValueHandler } from "./handlers/deleteOneCharacteristicValueHandler";

export const characteristicValuesRouter = createTRPCRouter({
  createOne: createOneCharacteristicValueHandler,
  readOne: readOneCharacteristicValueHandler,
  updateOne: updateOneCharacteristicValueHandler,
  readManyInfinite: readManyCharacteristicValuesInfiniteHandler,
  deleteOne: deleteOneCharacteristicValueHandler,
});
