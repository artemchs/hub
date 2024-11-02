import { Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserButton } from "~/components/admin/users/user-button";
import { SignOutModal } from "./SignOutModal";
import { IconLogout } from "@tabler/icons-react";
import { type Session } from "next-auth";

export function UserMenu({ session }: { session: Session }) {
  const [
    signOutModalOpened,
    { open: openSignOutModal, close: closeSignOutModal },
  ] = useDisclosure(false);

  return (
    <>
      <Menu shadow="md" position="top-end" withArrow>
        <Menu.Target>
          <UserButton
            email={session.user.email ?? ""}
            image={session.user.image ?? ""}
            name={session.user.name ?? ""}
          />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={openSignOutModal}
            color="red"
            leftSection={<IconLogout className="h-4 w-4" />}
          >
            Выйти из аккаунта
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <SignOutModal
        opened={signOutModalOpened}
        close={closeSignOutModal}
        open={openSignOutModal}
      />
    </>
  );
}
