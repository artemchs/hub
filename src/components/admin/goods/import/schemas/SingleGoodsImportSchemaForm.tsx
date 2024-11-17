import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { GoodsAttributesCombobox } from "~/components/admin/goods-attributes/GoodsAttributeCombobox";
import { GoodsCharacteristicCombobox } from "~/components/admin/goods-characteristics/GoodsCharacteristicCombobox";
import { GoodsIdCombobox } from "~/components/admin/goods-ids/GoodsIdCombobox";
import { FormSection } from "~/components/FormSection";
import {
  createOneGoodsImportSchemaSchema,
  type CreateOneGoodsImportSchemaInput,
} from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";
import {
  updateOneGoodsImportSchemaSchema,
  type UpdateOneGoodsImportSchemaInput,
} from "~/utils/validation/goods/import/schemas/updateOneGoodsImportSchema";

interface SingleGoodsImportSchemaFormProps {
  initialValues?: UpdateOneGoodsImportSchemaInput;
  onSubmit: (
    values: CreateOneGoodsImportSchemaInput | UpdateOneGoodsImportSchemaInput
  ) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodsImportSchemaForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: SingleGoodsImportSchemaFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? {
      name: "",
      schema: {
        name: "",
        sku: "",
        description: "",
        fullPrice: "",
        price: "",
        fixedDiscount: "",
        percentageDiscount: "",
        quantity: "",
        mediaKeys: "",
        attributes: [],
        characteristics: [],
        ids: [],
      },
    },
    validate: zodResolver(
      mode === "create"
        ? createOneGoodsImportSchemaSchema
        : updateOneGoodsImportSchemaSchema
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
      <FormSection title="Общее о схеме">
        <TextInput
          withAsterisk
          label="Название схемы"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
      </FormSection>
      <FormSection title="Медиа">
        <TextInput
          label="Колонка с ключами медиа"
          key={form.key("schema.mediaKeys")}
          {...form.getInputProps("schema.mediaKeys")}
        />
      </FormSection>
      <FormSection title="Основное">
        <TextInput
          label="Колонка с названием"
          key={form.key("schema.name")}
          {...form.getInputProps("schema.name")}
        />
        <TextInput
          label="Колонка с артикулом"
          key={form.key("schema.sku")}
          {...form.getInputProps("schema.sku")}
        />
        <TextInput
          label="Колонка с описанием"
          key={form.key("schema.description")}
          {...form.getInputProps("schema.description")}
        />
      </FormSection>
      <FormSection title="Цены">
        <TextInput
          label="Колонка с полной ценой"
          key={form.key("schema.fullPrice")}
          {...form.getInputProps("schema.fullPrice")}
        />
        <TextInput
          label="Колонка с ценой"
          key={form.key("schema.price")}
          {...form.getInputProps("schema.price")}
        />
        <TextInput
          label="Колонка с фиксированой скидкой"
          key={form.key("schema.fixedDiscount")}
          {...form.getInputProps("schema.fixedDiscount")}
        />
        <TextInput
          label="Колонка с процентной скидкой"
          key={form.key("schema.percentageDiscount")}
          {...form.getInputProps("schema.percentageDiscount")}
        />
      </FormSection>
      <FormSection title="Количество">
        <TextInput
          label="Колонка с количеством"
          key={form.key("schema.quantity")}
          {...form.getInputProps("schema.quantity")}
        />
      </FormSection>
      <FormSection
        title="Атрибуты"
        topLeftChildren={
          <Button
            variant="subtle"
            onClick={() =>
              form.setFieldValue("schema.attributes", [
                ...(form.values.schema.attributes ?? []),
                {
                  id: "",
                  field: "",
                },
              ])
            }
          >
            Добавить атрибут
          </Button>
        }
      >
        {form.values.schema.attributes?.map(({ id }, index) => (
          <Paper p="md" shadow="xs" withBorder key={index}>
            <Group>
              <ActionIcon
                size="xs"
                variant="transparent"
                color="red"
                onClick={() =>
                  form.setFieldValue(
                    "schema.attributes",
                    form.values.schema.attributes?.filter((_, i) => i !== index)
                  )
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
              <Stack className="flex-1 flex-col">
                <GoodsAttributesCombobox
                  label="Атрибут"
                  id={id}
                  setId={(id) =>
                    form.setFieldValue(`schema.attributes.${index}.id`, id)
                  }
                />
                <TextInput
                  label="Колонка"
                  key={form.key(`schema.attributes.${index}.field`)}
                  {...form.getInputProps(`schema.attributes.${index}.field`)}
                />
              </Stack>
            </Group>
          </Paper>
        ))}
      </FormSection>
      <FormSection
        title="Характеристики"
        topLeftChildren={
          <Button
            variant="subtle"
            onClick={() =>
              form.setFieldValue("schema.characteristics", [
                ...(form.values.schema.characteristics ?? []),
                {
                  id: "",
                  field: "",
                },
              ])
            }
          >
            Добавить характеристику
          </Button>
        }
      >
        {form.values.schema.characteristics?.map(({ id }, index) => (
          <Paper p="md" shadow="xs" withBorder key={index}>
            <Group>
              <ActionIcon
                size="xs"
                variant="transparent"
                color="red"
                onClick={() =>
                  form.setFieldValue(
                    "schema.characteristics",
                    form.values.schema.characteristics?.filter(
                      (_, i) => i !== index
                    )
                  )
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
              <Stack className="flex-1 flex-col">
                <GoodsCharacteristicCombobox
                  label="Характеристика"
                  id={id}
                  setId={(id) =>
                    form.setFieldValue(`schema.characteristics.${index}.id`, id)
                  }
                />
                <TextInput
                  label="Колонка"
                  key={form.key(`schema.characteristics.${index}.field`)}
                  {...form.getInputProps(
                    `schema.characteristics.${index}.field`
                  )}
                />
              </Stack>
            </Group>
          </Paper>
        ))}
      </FormSection>
      <FormSection
        title="Идентификаторы"
        topLeftChildren={
          <Button
            variant="subtle"
            onClick={() =>
              form.setFieldValue("schema.ids", [
                ...(form.values.schema.ids ?? []),
                {
                  id: "",
                  field: "",
                },
              ])
            }
          >
            Добавить идентификатор
          </Button>
        }
      >
        {form.values.schema.ids?.map(({ id }, index) => (
          <Paper p="md" shadow="xs" withBorder key={index}>
            <Group>
              <ActionIcon
                size="xs"
                variant="transparent"
                color="red"
                onClick={() =>
                  form.setFieldValue(
                    "schema.ids",
                    form.values.schema.ids?.filter((_, i) => i !== index)
                  )
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
              <Stack className="flex-1 flex-col">
                <GoodsIdCombobox
                  label="Идентификатор"
                  id={id}
                  setId={(id) =>
                    form.setFieldValue(`schema.ids.${index}.id`, id)
                  }
                />
                <TextInput
                  label="Колонка"
                  key={form.key(`schema.ids.${index}.field`)}
                  {...form.getInputProps(`schema.ids.${index}.field`)}
                />
              </Stack>
            </Group>
          </Paper>
        ))}
      </FormSection>
      <Group justify="flex-end" mt="md">
        <Button
          variant="subtle"
          component={Link}
          href="/admin/goods/import/schemas"
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
