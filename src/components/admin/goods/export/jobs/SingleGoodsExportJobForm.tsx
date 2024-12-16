import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect } from "react";
import { FormSection } from "~/components/FormSection";
import {
    createOneGoodsExportJobSchema,
    type CreateOneGoodsExportJobInput,
} from "~/utils/validation/goods/export/jobs";
import {
    updateOneGoodsExportJobSchema,
    type UpdateOneGoodsExportJobInput,
} from "~/utils/validation/goods/export/jobs";
import { GoodsExportSchemaCombobox } from "../schemas/GoodsExportSchemaCombobox";

interface SingleGoodsExportJobFormProps {
    initialValues?: UpdateOneGoodsExportJobInput;
    onSubmit: (
        values: CreateOneGoodsExportJobInput | UpdateOneGoodsExportJobInput
    ) => void;
    isPending?: boolean;
    isFetching?: boolean;
    mode: "create" | "update";
}

const SCHEDULE_OPTIONS = [
    { value: "0 0 * * *", label: "Каждый день в полночь" },
    { value: "0 */6 * * *", label: "Каждые 6 часов" },
    { value: "0 */12 * * *", label: "Каждые 12 часов" },
    { value: "0 0 * * 1", label: "Каждый понедельник в полночь" },
    { value: "0 0 1 * *", label: "Первый день каждого месяца" },
];

export function SingleGoodsExportJobForm({
    initialValues,
    onSubmit,
    isPending,
    isFetching,
    mode,
}: SingleGoodsExportJobFormProps) {
    const form = useForm({
        mode: "controlled",
        initialValues: initialValues ?? {
            name: "",
            schedule: SCHEDULE_OPTIONS[0]?.value,
            schemaId: "",
        },
        validate: zodResolver(
            mode === "create"
                ? createOneGoodsExportJobSchema
                : updateOneGoodsExportJobSchema
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
                form.onSubmit(onSubmit)(e);
            }}
            className="flex flex-col gap-4"
        >
            <FormSection title="Настройки задания">
                <TextInput
                    withAsterisk
                    label="Название"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <Select
                    withAsterisk
                    label="Расписание"
                    data={SCHEDULE_OPTIONS}
                    key={form.key("schedule")}
                    {...form.getInputProps("schedule")}
                />
                <GoodsExportSchemaCombobox
                    label="Схема экспорта"
                    id={form.values.schemaId}
                    setId={(id) => form.setFieldValue("schemaId", id ?? "")}
                />
            </FormSection>

            <Group justify="flex-end" mt="md">
                <Button
                    variant="subtle"
                    component={Link}
                    href="/admin/goods/export/jobs"
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
