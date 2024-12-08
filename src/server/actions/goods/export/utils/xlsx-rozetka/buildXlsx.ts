import { PrismaTransaction } from "~/server/db";
import { ExportGoods } from "../types";
import { findBestIdentifier } from "../findBestIdentifier";
import { utils, write } from "xlsx";
import { getXlsxInternalFields } from "../getXlsxInternalFields";

export const buildRozetkaXlsx = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: {
    goods: ExportGoods;
    schemaId: string;
  };
}) => {
  const rows = await Promise.all(
    payload.goods.map(async (good) => ({
      OFFERID: await findBestIdentifier({
        tx,
        payload: { schemaId: payload.schemaId, goodId: good.id },
      }),
      Цена: good.price.toString(),
      "Старая Цена": good.fullPrice.toString(),
      "Кол-во": good.quantity.toString(),
      Наличие: good.quantity.toNumber() > 0 ? "В наличии" : "Нет в наличии",
      ...(await getXlsxInternalFields({
        tx,
        payload: { schemaId: payload.schemaId, goodId: good.id },
      })),
    }))
  );

  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Rozetka Export");

  return write(workbook, { type: "buffer", bookType: "xlsx" });
};
