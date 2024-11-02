import { Box, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export function SignOutModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
  open: () => void;
}) {
  const [loading, { toggle }] = useDisclosure();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Выйти из аккаунта" centered>
        <Text>Вы уверены, что хотите выйти из аккаунта?</Text>
        <Box className="flex flex-col gap-2 lg:flex-row-reverse mt-8">
          <Button
            color="red"
            className="w-full lg:w-fit"
            onClick={async () => {
              toggle();
              await signOut({
                redirect: true,
                redirectTo: "/sign-in",
              });
            }}
            leftSection={<IconLogout className="h-4 w-4" />}
            loading={loading}
          >
            Выйти
          </Button>
          <Box mr={2}>
            <Button
              variant="default"
              className="w-full lg:w-fit"
              onClick={close}
            >
              Отмена
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
