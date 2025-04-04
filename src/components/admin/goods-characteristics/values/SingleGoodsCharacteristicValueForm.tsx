import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import {
    type CreateOneCharacteristicValueInput,
    createOneCharacteristicValueSchema,
} from "~/utils/validation/characteristics/values/createOneCharacteristicValue";
import {
    type UpdateOneCharacteristicValueInput,
    updateOneCharacteristicValueSchema,
} from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { GoodsCharacteristicCombobox } from "../GoodsCharacteristicCombobox";
import { FormProps } from "~/types/forms";

interface SingleGoodsCharacteristicValueFormProps extends FormProps {
    initialValues?: UpdateOneCharacteristicValueInput;
    onSubmit: (
        values:
            | CreateOneCharacteristicValueInput
            | UpdateOneCharacteristicValueInput
    ) => void;
    isPending?: boolean;
    isFetching?: boolean;
    mode: "create" | "update";
}

export function SingleGoodsCharacteristicValueForm({
    initialValues,
    onSubmit,
    isPending,
    isFetching,
    mode,
    close,
}: SingleGoodsCharacteristicValueFormProps) {
    const form = useForm({
        mode: "controlled",
        initialValues: initialValues ?? { value: "", parentId: "" },
        validate: zodResolver(
            mode === "create"
                ? createOneCharacteristicValueSchema
                : updateOneCharacteristicValueSchema
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
            <GoodsCharacteristicCombobox
                id={form.values.parentId}
                setId={(id) => form.setFieldValue("parentId", id!)}
                label="Характеристика"
            />
            <TextInput
                withAsterisk
                label="Значение"
                key={form.key("value")}
                {...form.getInputProps("value")}
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
