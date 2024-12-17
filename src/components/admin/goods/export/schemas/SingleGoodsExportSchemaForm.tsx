import {
    ActionIcon,
    Box,
    Button,
    Group,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { GoodsIdCombobox } from "~/components/admin/goods-ids/GoodsIdCombobox";
import { GoodsInternalFieldCombobox } from "~/components/admin/goods-internal-fields/GoodsInternalFieldCombobox";
import { DraggableItems } from "~/components/DraggableItems";
import { FormSection } from "~/components/FormSection";
import {
    createOneGoodsExportSchemaSchema,
    type CreateOneGoodsExportSchemaInput,
} from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";
import {
    updateOneGoodsExportSchemaSchema,
    type UpdateOneGoodsExportSchemaInput,
} from "~/utils/validation/goods/export/schemas/updateOneGoodsExportSchema";

interface SingleGoodsExportSchemaFormProps {
    initialValues?: UpdateOneGoodsExportSchemaInput;
    onSubmit: (
        values:
            | CreateOneGoodsExportSchemaInput
            | UpdateOneGoodsExportSchemaInput
    ) => void;
    isPending?: boolean;
    isFetching?: boolean;
    mode: "create" | "update";
}

const SELECT_DATA = [
    { value: "XML_ROZETKA", label: "XML для Rozetka" },
    {
        value: "XLSX_ROZETKA",
        label: "XLSX для Rozetka",
    },
];

export function SingleGoodsExportSchemaForm({
    initialValues,
    onSubmit,
    isPending,
    isFetching,
    mode,
}: SingleGoodsExportSchemaFormProps) {
    const form = useForm({
        mode: "controlled",
        initialValues: initialValues ?? {
            name: "",
            identifierIds: [],
            template: "XML_ROZETKA",
            internalFields: [],
        },
        validate: zodResolver(
            mode === "create"
                ? createOneGoodsExportSchemaSchema
                : updateOneGoodsExportSchemaSchema
        ),
    });

    useEffect(() => {
        if (initialValues) {
            form.setValues(initialValues);
            form.resetDirty(initialValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues]);

    return (
        <form
            onSubmit={(e) => {
                e.stopPropagation();
                // @ts-expect-error FIXME: form.onSubmit(onSubmit) should be valid
                form.onSubmit(onSubmit)(e);
            }}
            className="flex flex-col gap-4"
        >
            <FormSection title="Общее о схеме">
                <TextInput
                    withAsterisk
                    label="Название схемы"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <Select
                    withAsterisk
                    label="Шаблон"
                    data={SELECT_DATA}
                    key={form.key("template")}
                    {...form.getInputProps("template")}
                />
            </FormSection>

            <FormSection
                title="Идентификаторы"
                topLeftChildren={
                    <Button
                        variant="subtle"
                        onClick={() =>
                            form.setFieldValue("identifierIds", [
                                ...(form.values.identifierIds ?? []),
                                "",
                            ])
                        }
                    >
                        Добавить идентификатор
                    </Button>
                }
            >
                <DraggableItems
                    items={form.values.identifierIds ?? []}
                    droppableId="identifierIds"
                    onReorder={(items) =>
                        form.setFieldValue("identifierIds", items)
                    }
                    renderItem={(id, index, dragHandleProps) => (
                        <Group gap="md" align="start">
                            <Stack justify="space-between" gap="xs">
                                <ActionIcon
                                    {...dragHandleProps}
                                    variant="transparent"
                                    color="dark"
                                    size="xs"
                                >
                                    <IconGripVertical className="h-4 w-4" />
                                </ActionIcon>
                                <ActionIcon
                                    variant="transparent"
                                    color="red"
                                    size="xs"
                                    onClick={() =>
                                        form.setFieldValue(
                                            "identifierIds",
                                            form.values.identifierIds?.filter(
                                                (_, i) => i !== index
                                            )
                                        )
                                    }
                                >
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Stack>
                            <Box className="flex-1 flex flex-col gap-2">
                                <GoodsIdCombobox
                                    label="Идентификатор"
                                    id={id}
                                    setId={(id) =>
                                        form.setFieldValue(
                                            `identifierIds.${index}`,
                                            id
                                        )
                                    }
                                />
                            </Box>
                        </Group>
                    )}
                />
            </FormSection>

            {form.values.template.startsWith("XLSX") && (
                <FormSection
                    title="Внутренние поля"
                    topLeftChildren={
                        <Button
                            variant="subtle"
                            onClick={() =>
                                form.setFieldValue("internalFields", [
                                    ...(form.values.internalFields ?? []),
                                    { id: "", columnName: "" },
                                ])
                            }
                        >
                            Добавить внутреннее поле
                        </Button>
                    }
                >
                    <Stack>
                        {form.values.internalFields?.map(
                            (internalField, index) => (
                                <Group gap="md" align="start" key={index}>
                                    <Stack justify="space-between" gap="xs">
                                        <ActionIcon
                                            variant="transparent"
                                            color="red"
                                            size="xs"
                                            onClick={() =>
                                                form.setFieldValue(
                                                    "internalFields",
                                                    form.values.internalFields?.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Stack>
                                    <Box className="flex-1 flex flex-col gap-2">
                                        <GoodsInternalFieldCombobox
                                            label="Внутреннее поле"
                                            id={internalField.id}
                                            setId={(id) => {
                                                form.setFieldValue(
                                                    `internalFields.${index}.id`,
                                                    id
                                                );
                                                form.setFieldValue(
                                                    `internalFields.${index}.columnName`,
                                                    ""
                                                );
                                            }}
                                        />
                                        <TextInput
                                            withAsterisk
                                            label="Название колонки"
                                            key={form.key(
                                                `internalFields.${index}.columnName`
                                            )}
                                            {...form.getInputProps(
                                                `internalFields.${index}.columnName`
                                            )}
                                        />
                                    </Box>
                                </Group>
                            )
                        )}
                    </Stack>
                </FormSection>
            )}

            <Group justify="flex-end" mt="md">
                <Button
                    variant="subtle"
                    component={Link}
                    href="/admin/goods/export/schemas"
                >
                    Отменить
                </Button>
                <Button type="submit" loading={isPending}>
                    {mode === "create" ? "Создать" : "Сохранить"}
                </Button>
            </Group>
        </form>
    );
}
