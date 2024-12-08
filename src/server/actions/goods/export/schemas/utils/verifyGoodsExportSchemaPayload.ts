import { readOneInternalField } from "~/server/actions/internal-fields/readOneInternalField";
import { PrismaTransaction } from "~/server/db";
import { CreateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";

export async function verifyGoodsExportSchemaPayload({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodsExportSchemaInput;
}) {
  if (payload.template.startsWith("XLSX")) {
    const internalFields = payload.internalFields ?? [];

    for (const { id } of internalFields) {
      await readOneInternalField({ tx, payload: { id } });
    }
  }
}
