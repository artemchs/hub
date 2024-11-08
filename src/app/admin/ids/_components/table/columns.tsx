"use client";

import { createMRTColumnHelper } from "mantine-react-table";
import { type RouterOutputs } from "~/trpc/react";
import { DisplayDate } from "~/components/DisplayDate";

const columnHelper =
  createMRTColumnHelper<RouterOutputs["ids"]["readMany"]["items"][number]>();

export const goodsIdsColumns = [
  columnHelper.accessor((row) => row.name, {
    header: "Название",
    id: "name",
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Дата создания",
    Cell: ({ row }) => <DisplayDate date={row.original.createdAt} />,
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
