import { type CreateOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";
import { Decimal } from "decimal.js";
import { type GoodsImportJsonItem } from "../createOneGoodsImport";

export type MappedGood = {
    name: string | null;
    sku: string | null;
    description: string | null;
    fullPrice: Decimal | null;
    price: Decimal | null;
    fixedDiscount: Decimal | null;
    percentageDiscount: Decimal | null;
    quantity: string | null;
    mediaKeys: string[] | null;
    attributes: { id: string; value: string }[];
    characteristics: { id: string; values: string[] }[];
    internalFields: { id: string; values: string[] }[];
    ids: { id: string; value: string }[];
};

export const mapJsonToGoods = (
    json: GoodsImportJsonItem[],
    schema: CreateOneGoodsImportSchemaInput["schema"]
) => {
    try {
        const mappedGoods: MappedGood[] = [];

        for (const item of json) {
            if (!item) {
                throw new Error("Item is undefined or null");
            }

            const name = schema.name
                ? item[schema.name]
                    ? String(item[schema.name])
                    : null
                : null;

            const sku = schema.sku
                ? item[schema.sku]
                    ? String(item[schema.sku])
                    : null
                : null;

            const description = schema.description
                ? item[schema.description]
                    ? String(item[schema.description])
                    : null
                : null;

            const fullPrice = schema.fullPrice
                ? item[schema.fullPrice]
                    ? String(item[schema.fullPrice])
                    : null
                : null;

            const price = schema.price
                ? item[schema.price]
                    ? String(item[schema.price])
                    : null
                : null;

            const fixedDiscount = schema.fixedDiscount
                ? item[schema.fixedDiscount]
                    ? String(item[schema.fixedDiscount])
                    : null
                : null;

            const percentageDiscount = schema.percentageDiscount
                ? item[schema.percentageDiscount]
                    ? String(item[schema.percentageDiscount])
                          .replace("%", "")
                          .replace(",", ".")
                    : null
                : null;

            const quantity = schema.quantity
                ? item[schema.quantity]
                    ? String(item[schema.quantity])
                    : null
                : null;

            const mediaKeys = schema.mediaKeys
                ? item[schema.mediaKeys]
                    ? String(item[schema.mediaKeys])
                          .split(",")
                          .map((key) => `Media/${key.trim()}`)
                    : null
                : null;

            const attributes = schema.attributes
                ? schema.attributes.map((attribute) => {
                      if (!item[attribute.field]) {
                          throw new Error(
                              `Attribute field is required. Item with SKU: ${sku}`
                          );
                      }

                      return {
                          id: attribute.id,
                          value: String(item[attribute.field]),
                      };
                  })
                : [];

            const ids = schema.ids
                ? schema.ids.map((id) => {
                      if (!item[id.field]) {
                          throw new Error(
                              `ID field is required. Item with SKU: ${sku}`
                          );
                      }

                      return {
                          id: id.id,
                          value: String(item[id.field]),
                      };
                  })
                : [];

            const characteristics = schema.characteristics
                ? schema.characteristics.map((characteristic) => {
                      if (!item[characteristic.field]) {
                          throw new Error(
                              `Characteristic field is required. Item with SKU: ${sku}`
                          );
                      }

                      return {
                          id: characteristic.id,
                          values: String(item[characteristic.field]).split(","),
                      };
                  })
                : [];

            const internalFields = schema.internalFields
                ? schema.internalFields.map((internalField) => {
                      if (!item[internalField.field]) {
                          throw new Error(
                              `Internal field is required. Item with SKU: ${sku}`
                          );
                      }

                      return {
                          id: internalField.id,
                          values: String(item[internalField.field]).split(","),
                      };
                  })
                : [];

            mappedGoods.push({
                name,
                sku,
                description,
                fullPrice: fullPrice ? new Decimal(fullPrice) : null,
                price: price ? new Decimal(price) : null,
                fixedDiscount: fixedDiscount
                    ? new Decimal(fixedDiscount)
                    : null,
                percentageDiscount: percentageDiscount
                    ? new Decimal(percentageDiscount)
                    : null,
                quantity,
                mediaKeys,
                attributes,
                ids,
                characteristics,
                internalFields,
            });
        }

        return mappedGoods;
    } catch (error) {
        console.error(error);
        throw new Error("Could not map JSON to goods");
    }
};
