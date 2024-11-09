import { createTRPCRouter } from "../../trpc";
import { createOneCharacteristicHandler } from "./handlers/createOneCharacteristicHandler";
import { deleteOneCharacteristicHandler } from "./handlers/deleteOneCharacteristicHandler";
import {
  readManyCharacteristicsHandler,
  readManyCharacteristicsInfiniteHandler,
} from "./handlers/readManyCharacteristicsHandler";
import { readOneCharacteristicHandler } from "./handlers/readOneCharacteristicHandler";
import { updateOneCharacteristicHandler } from "./handlers/updateOneCharacteristicHandler";

export const characteristicsRouter = createTRPCRouter({
  createOne: createOneCharacteristicHandler,
  readOne: readOneCharacteristicHandler,
  readMany: readManyCharacteristicsHandler,
  readManyInfinite: readManyCharacteristicsInfiniteHandler,
  updateOne: updateOneCharacteristicHandler,
  deleteOne: deleteOneCharacteristicHandler,
});
