"use client";

import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayDate } from "~/components/DisplayDate";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
  createMRTColumnHelper<
    RouterOutputs["goods"]["import"]["readMany"]["items"][number]
  >();

export const goodsImportColumns = [
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
