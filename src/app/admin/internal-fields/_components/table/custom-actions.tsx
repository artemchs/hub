import { Box, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

export function GoodsInternalFieldsTableCustomActions({
  table,
}: {
  table: MRT_TableInstance<
    RouterOutputs["internalFields"]["readMany"]["items"][number]
  >;
}) {
  return (
    <Box className="flex items-center gap-2">
      <Button
        leftSection={<IconPlus className="h-4 w-4" />}
        component={Link}
        href="/admin/internal-fields/create"
      >
        Создать
      </Button>
    </Box>
  );
}
