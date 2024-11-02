"use client";

import { Box, Button, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { LogotypeFullLink } from "~/components/branding";

export default function Page() {
  const [loading, { toggle }] = useDisclosure();

  return (
    <div className="h-[100dvh] w-[100dvw] flex justify-center items-center">
      <Box className="max-w-screen-sm px-4 flex flex-col gap-8">
        <LogotypeFullLink href="/sign-in" />
        <Paper shadow="xs" p="md" className="flex w-full flex-col gap-8">
          <Box className="flex flex-col gap-1">
            <Text size="xl" className="text-pretty">
              Добро пожаловать
            </Text>
            <Text c="dimmed" className="text-pretty">
              Для использования системы войдите в свою учетную запись.
            </Text>
          </Box>
          <Box className="flex flex-col gap-4">
            <Button
              loading={loading}
              variant="outline"
              leftSection={<IconBrandGoogleFilled className="h-4 w-4" />}
              onClick={async () => {
                toggle();
                await signIn("google", {
                  redirect: true,
                  redirectTo: "/admin",
                });
              }}
            >
              Войти через Google
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
