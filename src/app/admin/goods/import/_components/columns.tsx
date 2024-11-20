"use client";

import { Text } from "@mantine/core";
import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayOneGoodsImportSchemaName } from "~/components/admin/goods/import/schemas/DisplayOneGoodsImportSchemaName";
import { DisplayDate } from "~/components/DisplayDate";
import { type RouterOutputs } from "~/trpc/react";
import { getAsyncJobStatusUserMessage } from "~/utils/miscellaneous/getAsyncJobStatusUserMessage";

const columnHelper =
  createMRTColumnHelper<
    RouterOutputs["goods"]["import"]["readMany"]["items"][number]
  >();

export const goodsImportColumns = [
  columnHelper.accessor((row) => row.schemaId, {
    header: "Схема",
    id: "schemaId",
    Cell: ({ row }) => (
      <DisplayOneGoodsImportSchemaName id={row.original.schemaId} />
    ),
  }),
  columnHelper.accessor((row) => row.status, {
    header: "Статус",
    id: "status",
    Cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Text
          c={
            status === "COMPLETED"
              ? "green"
              : status === "FAILED"
                ? "red"
                : status === "PENDING"
                  ? "orange"
                  : status === "PROCESSING"
                    ? "blue"
                    : "dark"
          }
        >
          {getAsyncJobStatusUserMessage(status)}
        </Text>
      );
    },
  }),
  columnHelper.accessor((row) => row.createdAt, {
    header: "Дата создания",
    Cell: ({ row }) => <DisplayDate date={row.original.updatedAt} />,
    filterVariant: "date-range",
    id: "createdAt",
  }),
];
