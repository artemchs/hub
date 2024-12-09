import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EditorInput } from "~/components/EditorInput";
import {
  type CreateOneGoodInput,
  createOneGoodSchema,
} from "~/utils/validation/goods/createOneGood";
import {
  type UpdateOneGoodInput,
  updateOneGoodSchema,
} from "~/utils/validation/goods/updateOneGood";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { GoodsAttributesCombobox } from "../goods-attributes/GoodsAttributeCombobox";
import { GoodsAttributeValueCombobox } from "../goods-attributes/values/GoodsAttributeValueCombobox";
import { useMultipleUpload } from "~/hooks/useUpload";
import { env } from "~/env";
import { ImageDropzone } from "~/components/ImageDropzone";
import { FormSection } from "~/components/FormSection";
import { DraggableItems } from "~/components/DraggableItems";
import { GoodsCharacteristicCombobox } from "../goods-characteristics/GoodsCharacteristicCombobox";
import { GoodsCharacteristicValuesMultiselect } from "../goods-characteristics/values/GoodsCharacteristicValuesMultiselect";
import { GoodsTagsMultiselect } from "../goods-tags/GoodsTagsMultiselect";
import { GoodsInternalFieldCombobox } from "../goods-internal-fields/GoodsInternalFieldCombobox";
import { GoodsInternalFieldValuesMultiselect } from "../goods-internal-fields/values/GoodsInternalFieldValuesMultiselect";
import { GoodsIdValuesMultiselect } from "../goods-ids/values/GoodsIdValuesMultiselect";

interface SingleGoodFormProps {
  initialValues?: UpdateOneGoodInput;
  onSubmit: (values: CreateOneGoodInput | UpdateOneGoodInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: SingleGoodFormProps) {
  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? {
      name: "",
      sku: "",
      description: "",
      categoryId: undefined,
      attributes: [],
      characteristics: [],
      idValueIds: [],
      mediaKeys: [],
      tagIds: [],
      internalFields: [],
      price: 0,
      fullPrice: 0,
      quantity: 0,
    },
    validate: zodResolver(
      mode === "create" ? createOneGoodSchema : updateOneGoodSchema
    ),
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const {
    uploadMultipleFiles,
    isUploadMultipleFilesPending,
    uploadMultipleFilesErrors,
  } = useMultipleUpload();

  useEffect(() => {
    if (initialValues?.mediaKeys) {
      const urls = initialValues.mediaKeys.map(
        (key) => `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${key}`
      );
      setPreviewUrls(urls);
    }
    form.setValues(initialValues ?? form.values);
    form.resetDirty(initialValues ?? form.values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleFileSelect = async (files: File[]) => {
    try {
      const results = await uploadMultipleFiles({ dir: "Media", files });
      const newKeys = results.map((result) => result.key);

      form.setFieldValue("mediaKeys", [
        ...(form.values.mediaKeys ?? []),
        ...newKeys,
      ]);
      setPreviewUrls((prev) => [
        ...prev,
        ...newKeys.map(
          (key) => `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${key}`
        ),
      ]);

      if (Object.keys(uploadMultipleFilesErrors).length > 0) {
        form.setFieldError(
          "mediaKeys",
          `Some files failed to upload: ${Object.values(
            uploadMultipleFilesErrors
          ).join(", ")}`
        );
      }
    } catch (error) {
      form.setFieldError("mediaKeys", "Failed to upload files");
    }
  };

  const handleFileOperations = {
    remove: (index: number) => {
      const newMediaKeys = [...(form.values.mediaKeys ?? [])];
      newMediaKeys.splice(index, 1);
      form.setFieldValue("mediaKeys", newMediaKeys);
      setPreviewUrls((prev) => {
        const newUrls = [...prev];
        newUrls.splice(index, 1);
        return newUrls;
      });
    },
    reorder: (oldIndex: number, newIndex: number) => {
      const newMediaKeys = [...(form.values.mediaKeys ?? [])];
      const [movedKey] = newMediaKeys.splice(oldIndex, 1);
      if (!movedKey) return;
      newMediaKeys.splice(newIndex, 0, movedKey);
      form.setFieldValue("mediaKeys", newMediaKeys);

      setPreviewUrls((prev) => {
        const newUrls = [...prev];
        const [movedUrl] = newUrls.splice(oldIndex, 1);
        if (!movedUrl) return prev;
        newUrls.splice(newIndex, 0, movedUrl);
        return newUrls;
      });
    },
  };

  const renderNumberInput = (name: string, label: string, scale = 2) => (
    <NumberInput
      label={label}
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={scale}
      key={form.key(name)}
      {...form.getInputProps(name)}
    />
  );

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.onSubmit(onSubmit)(e);
      }}
    >
      <Stack>
        <FormSection title="Медиа">
          <ImageDropzone
            multiple={true}
            handleSelect={handleFileSelect}
            handleRemove={handleFileOperations.remove}
            handleReorder={handleFileOperations.reorder}
            previewUrls={previewUrls}
            loading={isUploadMultipleFilesPending}
            error={Object.values(uploadMultipleFilesErrors).join(", ") || null}
          />
        </FormSection>

        <FormSection title="Основное">
          <TextInput
            withAsterisk
            label="Название"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Артикул"
            key={form.key("sku")}
            {...form.getInputProps("sku")}
          />
          <EditorInput
            label="Описание"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
        </FormSection>

        <FormSection title="Цены">
          {renderNumberInput("fullPrice", "Полная цена")}
          {renderNumberInput("price", "Цена")}
        </FormSection>

        <FormSection title="Количество">
          {renderNumberInput("quantity", "Количество", 3)}
        </FormSection>

        <FormSection
          title="Атрибуты"
          topLeftChildren={
            <Button
              variant="subtle"
              onClick={() =>
                form.setFieldValue("attributes", [
                  ...(form.values.attributes ?? []),
                  { id: "", valueId: "" },
                ])
              }
            >
              Добавить атрибут
            </Button>
          }
        >
          <DraggableItems
            items={form.values.attributes ?? []}
            droppableId="attributes"
            onReorder={(items) => form.setFieldValue("attributes", items)}
            renderItem={(attribute, index, dragHandleProps) => (
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
                        "attributes",
                        form.values.attributes?.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Stack>
                <Box className="flex-1 flex flex-col gap-2">
                  <GoodsAttributesCombobox
                    label="Атрибут"
                    id={attribute.id}
                    setId={(id) => {
                      form.setFieldValue(`attributes.${index}.id`, id);
                      form.setFieldValue(`attributes.${index}.valueId`, "");
                    }}
                  />
                  <GoodsAttributeValueCombobox
                    label="Значение"
                    id={attribute.valueId}
                    parentId={attribute.id}
                    setId={(id) =>
                      form.setFieldValue(`attributes.${index}.valueId`, id)
                    }
                    disabled={!attribute.id}
                  />
                </Box>
              </Group>
            )}
          />
        </FormSection>

        <FormSection
          title="Харатеристики"
          topLeftChildren={
            <Button
              variant="subtle"
              onClick={() =>
                form.setFieldValue("characteristics", [
                  ...(form.values.characteristics ?? []),
                  { id: "", valueIds: [] },
                ])
              }
            >
              Добавить характеристику
            </Button>
          }
        >
          <DraggableItems
            items={form.values.characteristics ?? []}
            droppableId="characteristics"
            onReorder={(items) => form.setFieldValue("characteristics", items)}
            renderItem={(characteristic, index, dragHandleProps) => (
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
                        "characteristics",
                        form.values.characteristics?.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Stack>
                <Box className="flex-1 flex flex-col gap-2">
                  <GoodsCharacteristicCombobox
                    label="Характеристика"
                    id={characteristic.id}
                    setId={(id) => {
                      form.setFieldValue(`characteristics.${index}.id`, id);
                      form.setFieldValue(
                        `characteristics.${index}.valueIds`,
                        []
                      );
                    }}
                  />
                  <GoodsCharacteristicValuesMultiselect
                    label="Значения"
                    ids={characteristic.valueIds}
                    setIds={(ids) =>
                      form.setFieldValue(
                        `characteristics.${index}.valueIds`,
                        ids
                      )
                    }
                    disabled={!characteristic.id}
                  />
                </Box>
              </Group>
            )}
          />
        </FormSection>

        <FormSection
          title="Внутренние поля"
          topLeftChildren={
            <Button
              variant="subtle"
              onClick={() =>
                form.setFieldValue("internalFields", [
                  ...(form.values.internalFields ?? []),
                  { id: "", valueIds: [] },
                ])
              }
            >
              Добавить внутреннее поле
            </Button>
          }
        >
          <Stack>
            {form.values.internalFields?.map((internalField, index) => (
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
                      form.setFieldValue(`internalFields.${index}.id`, id);
                      form.setFieldValue(
                        `internalFields.${index}.valueIds`,
                        []
                      );
                    }}
                  />
                  <GoodsInternalFieldValuesMultiselect
                    label="Значения"
                    ids={internalField.valueIds}
                    setIds={(ids) =>
                      form.setFieldValue(
                        `internalFields.${index}.valueIds`,
                        ids
                      )
                    }
                    parentId={internalField.id}
                    disabled={!internalField.id}
                  />
                </Box>
              </Group>
            ))}
          </Stack>
        </FormSection>

        <FormSection title="Дополнительное">
          <GoodsTagsMultiselect
            ids={form.values.tagIds ?? []}
            setIds={(ids) => form.setFieldValue("tagIds", ids)}
            label="Теги"
          />
          <GoodsIdValuesMultiselect
            ids={form.values.idValueIds ?? []}
            setIds={(ids) => form.setFieldValue("idValueIds", ids)}
            label="Идентификаторы"
          />
        </FormSection>

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" component={Link} href="/admin/goods">
            Отменить
          </Button>
          <Button type="submit" loading={isPending}>
            {mode === "create" ? "Создать" : "Сохранить"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
