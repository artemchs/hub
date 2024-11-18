"use client";

import { AppShell, Burger, Group, NavLink, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogotypeFullLink } from "~/components/branding";
import { UserMenu } from "./UserMenu";
import {
  IconBooks,
  IconCategory,
  IconDiamond,
  IconFileImport,
  IconHome,
  IconIdBadge2,
  IconPhoto,
  IconRuler2,
  IconTableImport,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";

const linkData = [
  {
    label: "Главная",
    leftSection: <IconHome className="h-4 w-4" />,
    href: "/admin",
  },
  {
    label: "Товары",
    leftSection: <IconBooks className="h-4 w-4" />,
    href: "/admin/goods",
  },
  {
    label: "Импорт товаров",
    leftSection: <IconTableImport className="h-4 w-4" />,
    href: "/admin/goods/import",
  },
  {
    label: "Схемы импорта",
    leftSection: <IconFileImport className="h-4 w-4" />,
    href: "/admin/goods/import/schemas",
  },
  {
    label: "Категории",
    leftSection: <IconCategory className="h-4 w-4" />,
    href: "/admin/categories",
  },
  {
    label: "Идентификаторы",
    leftSection: <IconIdBadge2 className="h-4 w-4" />,
    href: "/admin/ids",
  },
  {
    label: "Характеристики",
    leftSection: <IconDiamond className="h-4 w-4" />,
    href: "/admin/characteristics",
  },
  {
    label: "Атрибуты",
    leftSection: <IconRuler2 className="h-4 w-4" />,
    href: "/admin/attributes",
  },
  {
    label: "Медиа",
    leftSection: <IconPhoto className="h-4 w-4" />,
    href: "/admin/media",
  },
];

export function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <LogotypeFullLink href="/admin" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {/* <AppShell.Section>Navbar header</AppShell.Section> */}
        <AppShell.Section grow component={ScrollArea}>
          {linkData.map(({ label, leftSection, href }) => (
            <NavLink
              prefetch={true}
              className="rounded"
              active={pathname === href}
              component={Link}
              key={href}
              href={href}
              label={label}
              leftSection={leftSection}
            />
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <UserMenu session={session} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main className="bg-gray-50">{children}</AppShell.Main>
    </AppShell>
  );
}
