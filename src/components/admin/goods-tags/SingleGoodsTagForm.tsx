import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useEffect } from "react";
import { FormProps } from "~/types/forms";
import {
    type CreateOneTagInput,
    createOneTagSchema,
} from "~/utils/validation/tags/createOneTag";
import {
    type UpdateOneTagInput,
    updateOneTagSchema,
} from "~/utils/validation/tags/udpateOneTag";

interface SingleGoodsTagFormProps extends FormProps {
    initialValues?: UpdateOneTagInput;
    onSubmit: (values: CreateOneTagInput | UpdateOneTagInput) => void;
    isPending?: boolean;
    isFetching?: boolean;
    mode: "create" | "update";
}

export function SingleGoodsTagForm({
    initialValues,
    onSubmit,
    isPending,
    isFetching,
    mode,
    close,
}: SingleGoodsTagFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues ?? { name: "" },
        validate: zodResolver(
            mode === "create" ? createOneTagSchema : updateOneTagSchema
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
                void form.onSubmit((values) => {
                    onSubmit(values);
                })(e);
            }}
            className="flex flex-col gap-4"
        >
            <TextInput
                withAsterisk
                label="Название"
                key={form.key("name")}
                {...form.getInputProps("name")}
            />
            <Group justify="flex-end" mt="md">
                <Button variant="subtle" onClick={close}>
                    Отменить
                </Button>
                <Button type="submit" loading={isPending}>
                    {mode === "create" ? "Создать" : "Сохранить"}
                </Button>
            </Group>
        </form>
    );
}
