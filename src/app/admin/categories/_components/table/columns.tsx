"use client";

import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayGoodsCategoryName } from "~/components/admin/goods-categories/DisplayGoodsCategoryName";
import { DisplayDate } from "~/components/DisplayDate";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
  createMRTColumnHelper<
    RouterOutputs["categories"]["readMany"]["items"][number]
  >();

export const goodsCategoriesColumns = [
  columnHelper.accessor((row) => row.name, {
    header: "Название",
    id: "name",
  }),
  columnHelper.accessor((row) => row.parentId, {
    header: "Родительская категория",
    Cell: ({ row }) => {
      const parentId = row.original.parentId;

      if (!parentId) {
        return "Нет";
      }

      return <DisplayGoodsCategoryName id={parentId} />;
    },
    id: "parentId",
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
