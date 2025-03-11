"use client";

import { Box, Image } from "@mantine/core";
import Decimal from "decimal.js";
import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayDate } from "~/components/DisplayDate";
import { env } from "~/env";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
    createMRTColumnHelper<
        RouterOutputs["goods"]["readMany"]["items"][number]
    >();

export const goodsColumns = [
    columnHelper.accessor((row) => row.name, {
        header: "Название",
        id: "name",
        Cell: ({ row }) => {
            const imageUrl = `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${row.original.mediaToGood[0]?.media.key}`;

            return (
                <Box className="flex items-center gap-2">
                    <Image
                        src={imageUrl}
                        alt={row.original.name}
                        className="w-20 h-20"
                        fit="cover"
                    />
                    {row.original.name}
                </Box>
            );
        },
    }),
    columnHelper.accessor((row) => row.sku, {
        header: "Артикул",
        id: "sku",
    }),
    columnHelper.accessor((row) => row.fullPrice, {
        header: "Старая цена",
        id: "fullPrice",
    }),
    columnHelper.accessor((row) => row.price, {
        header: "Новая цена",
        id: "price",
    }),
    columnHelper.accessor(
        (row) => {
            if (
                !row.fullPrice ||
                !row.price ||
                (row.fullPrice as unknown as number) <= 0
            ) {
                return null;
            }

            // Using Decimal.js for precise calculation
            const fullPrice = new Decimal(row.fullPrice);
            const price = new Decimal(row.price);

            // Calculate discount percentage: ((fullPrice - price) / fullPrice) * 100
            const discount = fullPrice
                .minus(price)
                .dividedBy(fullPrice)
                .times(100)
                .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);

            return discount.toNumber();
        },
        {
            header: "Скидка",
            id: "discount",
            Cell: ({ cell }) => {
                const value = cell.getValue();
                return value !== null ? `${value}%` : "-";
            },
        }
    ),
    columnHelper.accessor((row) => row.quantity, {
        header: "Количество",
        id: "quantity",
    }),
    columnHelper.accessor((row) => row.createdAt, {
        header: "Дата создания",
        Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
        filterVariant: "date-range",
        id: "createdAt",
    }),
    columnHelper.accessor((row) => row.updatedAt, {
        header: "Дата обновления",
        Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
        filterVariant: "date-range",
        id: "updatedAt",
    }),
];
