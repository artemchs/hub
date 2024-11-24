import { type PrismaTransaction } from "~/server/db";
import { type Storage } from "~/server/storage";
import { type CreateOneGoodsExportInput } from "~/utils/validation/goods/export/createOneGoodsExport";
import { buildRozetkaXml } from "./utils/xml-rozetka/buildXml";
import { uploadObject } from "~/server/utils/storage/upload-object";
import { readOneGoodsExportSchema } from "./schemas/readOneGoodsExportSchema";

export const createOneGoodsExport = async ({
  tx,
  storage,
  payload,
}: {
  tx: PrismaTransaction;
  storage: Storage;
  payload: CreateOneGoodsExportInput;
}) => {
  const schema = await readOneGoodsExportSchema({
    tx,
    payload: { id: payload.schemaId },
  });

  let goodsExportId: string | null = null;

  try {
    const goodsExport = await tx.goodsExport.create({
      data: {
        status: "PROCESSING",
        schemaId: schema.id,
      },
    });
    goodsExportId = goodsExport.id;

    const goods = await tx.good.findMany({
      include: {
        category: {
          select: { name: true },
        },
        mediaToGood: {
          include: {
            media: {
              select: { key: true },
            },
          },
        },
        attributeToGood: {
          include: {
            attribute: {
              select: { name: true },
            },
            value: {
              select: { value: true },
            },
          },
        },
        characteristicToGood: {
          include: {
            characteristic: {
              select: { name: true },
            },
            values: {
              select: { value: true },
            },
          },
        },
      },
    });

    let fileKey: string | null = null;

    switch (schema.template) {
      case "XML_ROZETKA":
        const xml = await buildRozetkaXml({
          tx,
          payload: { goods, schemaId: schema.id },
        });

        fileKey = `Export/${goodsExportId}.xml`;

        await uploadObject(storage, {
          Body: Buffer.from(String(xml), "utf-8"),
          Key: fileKey,
        });

        break;
      default:
        throw new Error("Unknown export schema template");
    }

    await tx.goodsExport.update({
      where: {
        id: goodsExportId,
      },
      data: {
        status: "COMPLETED",
        fileKey,
      },
    });
  } catch (error) {
    if (goodsExportId) {
      await tx.goodsExport.update({
        where: {
          id: goodsExportId,
        },
        data: {
          status: "FAILED",
        },
      });
    }
    console.error(error);
    throw error;
  }
};
