import { Builder } from "xml2js";
import { env } from "~/env";
import { ExportGoods } from "../types";
import { PrismaTransaction } from "~/server/db";
import { RozetkaOffer } from "./types";
import { findBestIdentifier } from "../findBestIdentifier";

async function buildOffers(
    goods: ExportGoods,
    tx: PrismaTransaction,
    schemaId: string
): Promise<RozetkaOffer[]> {
    return await Promise.all(
        goods.map(async (good) => ({
            $: {
                id:
                    (await findBestIdentifier({
                        tx,
                        payload: { schemaId, goodId: good.id },
                    })) ?? "",
                available: good.quantity.toNumber() > 0,
            },
            old_price: [good.fullPrice.toString()],
            price: [good.price.toString()],
            currencyId: ["UAH"],
            categoryId: good.category?.name ? [good.category.name] : undefined,
            picture: good.mediaToGood.map(
                (m) =>
                    `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${m.media.key}`
            ),
            name: [good.name],
            description: [{ _: good.description }],
            stock_quantity: [good.quantity.toString()],
            param: [
                ...good.attributeToGood.map((attr) => ({
                    _: attr.value.value,
                    $: { name: attr.attribute.name },
                })),
                ...good.characteristicToGood.map((char) => ({
                    _: char.values.map((v) => v.value).join(", "),
                    $: { name: char.characteristic.name },
                })),
            ],
        }))
    );
}

export const buildRozetkaXml = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: {
        goods: ExportGoods;
        schemaId: string;
    };
}) => {
    const builder = new Builder({
        xmldec: { version: "1.0", encoding: "UTF-8" },
    });

    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace("T", " ");

    const categories = payload.goods
        .map((good) => good.category)
        .filter((cat): cat is { name: string } => !!cat)
        .map((cat) => ({
            _: cat.name,
            $: { id: cat.name },
        }));

    const offers = await buildOffers(payload.goods, tx, payload.schemaId);

    const xmlObj = {
        yml_catalog: {
            $: { date: formatted },
            shop: [
                {
                    name: ["Croca Shop"],
                    company: ["Croca Shop"],
                    url: ["https://croca.shop"],
                    currencies: [
                        {
                            currency: [{ $: { id: "UAH", rate: "1" } }],
                        },
                    ],
                    categories: [{ category: categories }],
                    offers: [{ offer: offers }],
                },
            ],
        },
    };

    return builder.buildObject(xmlObj);
};
