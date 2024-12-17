import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { createOneInternalFieldSchema } from "~/utils/validation/internal-fields/createOneInternalField";
import {
    updateOneInternalFieldSchema,
    type UpdateOneInternalFieldInput,
} from "~/utils/validation/internal-fields/updateOneInternalField";

interface SingleGoodsInternalFieldFormProps {
    initialValues?: UpdateOneInternalFieldInput;
    onSubmit: (values: UpdateOneInternalFieldInput) => void;
    isPending?: boolean;
    isFetching?: boolean;
    mode: "create" | "update";
    close: () => void; // Add this
}

export function SingleGoodsInternalFieldForm({
    initialValues,
    onSubmit,
    isPending,
    isFetching,
    mode,
}: SingleGoodsInternalFieldFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: initialValues ?? { name: "" },
        validate: zodResolver(
            mode === "create"
                ? createOneInternalFieldSchema
                : updateOneInternalFieldSchema
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
