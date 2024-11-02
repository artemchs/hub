import { Box, Text } from "@mantine/core";
import { IconPackageExport } from "@tabler/icons-react";
import Link from "next/link";

export function LogotypeFullLink({ href }: { href: string }) {
  return (
    <Box
      component={Link}
      variant="transparent"
      href={href}
      className="flex items-center gap-2"
    >
      <IconPackageExport className="h-8 w-8 text-primary" />
      <Text className="text-2xl font-semibold">Hub</Text>
    </Box>
  );
}
