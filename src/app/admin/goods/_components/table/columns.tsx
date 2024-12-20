"use client";

import { Box, Image } from "@mantine/core";
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
                        width={50}
                        height={50}
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
        header: "Полная цена",
        id: "fullPrice",
    }),
    columnHelper.accessor((row) => row.price, {
        header: "Цена",
        id: "price",
    }),
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
