import { Group, Paper, Stack, Text } from "@mantine/core";

export function FormSection({
  title,
  children,
  topLeftChildren,
}: {
  title?: string;
  children: React.ReactNode;
  topLeftChildren?: React.ReactNode;
}) {
  return (
    <Paper shadow="xs" p="lg">
      <Stack>
        <Group justify="space-between">
          {title && (
            <Text size="lg" fw="bold">
              {title}
            </Text>
          )}
          {topLeftChildren}
        </Group>
        {children}
      </Stack>
    </Paper>
  );
}
