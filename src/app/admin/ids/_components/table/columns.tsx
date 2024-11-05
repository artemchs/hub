"use client";

import { createMRTColumnHelper } from "mantine-react-table";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
  createMRTColumnHelper<RouterOutputs["ids"]["readMany"]["items"][number]>();

export const goodsIdsColumns = [
  columnHelper.accessor((row) => row.name, {
    header: "Название",
    id: "name",
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Дата создания",
    Cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
    filterVariant: "date-range",
    id: "createdAt",
  }),
];
