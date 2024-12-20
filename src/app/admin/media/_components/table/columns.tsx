"use client";

import {
    ActionIcon,
    Box,
    Button,
    CopyButton,
    Group,
    Image,
    Text,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";
import { createMRTColumnHelper } from "mantine-react-table";
import { DisplayDate } from "~/components/DisplayDate";
import { env } from "~/env";
import { type RouterOutputs } from "~/trpc/react";

const columnHelper =
    createMRTColumnHelper<
        RouterOutputs["media"]["readMany"]["items"][number]
    >();

export const goodsMediaColumns = [
    columnHelper.accessor((row) => row.name, {
        header: "Название",
        id: "name",
        Cell: ({ row }) => {
            const imageUrl = `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${row.original.key}`;

            return (
                <Box className="flex items-center gap-2">
                    <Image
                        src={imageUrl}
                        alt={row.original.name}
                        width={50}
                        height={50}
                        fit="cover"
                    />
                    {row.original.name}
                </Box>
            );
        },
    }),
    columnHelper.accessor((row) => row.key, {
        header: "Ссылка",
        id: "link",
        Cell: ({ row }) => {
            const fileUrl = `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${row.original.key}`;

            return (
                <Group gap="xs">
                    <CopyButton value={fileUrl}>
                        {({ copied, copy }) => (
                            <Button
                                leftSection={
                                    copied ? (
                                        <IconCheck className="h-4 w-4" />
                                    ) : (
                                        <IconCopy className="h-4 w-4" />
                                    )
                                }
                                color={copied ? "teal" : "dark"}
                                onClick={copy}
                                size="compact-sm"
                                variant="subtle"
                            >
                                Скопировать
                            </Button>
                        )}
                    </CopyButton>
                    <ActionIcon
                        component="a"
                        href={fileUrl}
                        target="_blank"
                        variant="transparent"
                        c="dark"
                    >
                        <IconExternalLink className="h-4 w-4" />
                    </ActionIcon>
                </Group>
            );
        },
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
