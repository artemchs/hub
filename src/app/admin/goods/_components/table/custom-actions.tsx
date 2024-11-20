import { Box, Button } from "@mantine/core";
import { IconPlus, IconTableImport } from "@tabler/icons-react";
import type { MRT_TableInstance } from "mantine-react-table";
import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

export function GoodsTableCustomActions({
  table,
}: {
  table: MRT_TableInstance<RouterOutputs["goods"]["readMany"]["items"][number]>;
}) {
  return (
    <Box className="flex items-center gap-2">
      <Button
        leftSection={<IconPlus className="h-4 w-4" />}
        component={Link}
        href="/admin/goods/create"
      >
        Создать
      </Button>
      <Button
        variant="subtle"
        leftSection={<IconTableImport className="h-4 w-4" />}
        component={Link}
        href="/admin/goods/import/create"
      >
        Импортировать
      </Button>
    </Box>
  );
}
