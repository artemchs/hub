import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
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
import { GoodsCategoryCombobox } from "../goods-categories/GoodsCategoryCombobox";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IconGripVertical, IconPlus, IconTrash } from "@tabler/icons-react";
import { GoodsAttributesCombobox } from "../goods-attributes/GoodsAttributeCombobox";
import { GoodsAttributeValuesMultiselect } from "../goods-attributes/values/GoodsAttributeValuesMultiselect";
import { GoodsAttributeValueCombobox } from "../goods-attributes/values/GoodsAttributeValueCombobox";
import { GoodsCharacteristicCombobox } from "../goods-characteristics/GoodsCharacteristicCombobox";
import { GoodsCharacteristicValuesMultiselect } from "../goods-characteristics/values/GoodsCharacteristicValuesMultiselect";
import { useMultipleUpload, useSingleUpload } from "~/hooks/useUpload";
import { env } from "~/env";
import { ImageDropzone } from "~/components/ImageDropzone";

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
      sku: "",
      description: "",
      categoryId: undefined,
      attributes: [],
      characteristics: [],
      idValueIds: [],
      mediaKeys: [],
      price: 0,
      fullPrice: 0,
      quantity: 0,
    },
    validate: zodResolver(
      mode === "create" ? createOneGoodSchema : updateOneGoodSchema
    ),
  });

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
      form.resetDirty(initialValues);

      if (initialValues.mediaKeys) {
        const urls = initialValues.mediaKeys.map(
          (key) => `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${key}`
        );
        setPreviewUrls(urls);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    uploadMultipleFiles,
    isUploadMultipleFilesPending,
    uploadMultipleFilesErrors,
  } = useMultipleUpload();

  const handleFileSelect = async (files: File[]) => {
    try {
      const results = await uploadMultipleFiles({
        dir: "Media",
        files,
      });

      const newKeys = results.map((result) => result.key);

      form.setFieldValue("mediaKeys", [
        ...(form.values.mediaKeys ?? []),
        ...newKeys,
      ]);

      const newPreviewUrls = newKeys.map(
        (key) => `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${key}`
      );
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      if (Object.keys(uploadMultipleFilesErrors).length > 0) {
        form.setFieldError(
          "mediaKeys",
          `Some files failed to upload: ${Object.values(uploadMultipleFilesErrors).join(", ")}`
        );
      }
    } catch (error) {
      form.setFieldError("mediaKeys", "Failed to upload files");
    }
  };

  // Handle file removal
  const handleRemove = (index: number) => {
    const newMediaKeys = [...(form.values.mediaKeys ?? [])];
    newMediaKeys.splice(index, 1);
    form.setFieldValue("mediaKeys", newMediaKeys);

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
  };

  // Handle file reorder
  const handleReorder = (oldIndex: number, newIndex: number) => {
    const newMediaKeys = [...(form.values.mediaKeys ?? [])];
    const [movedKey] = newMediaKeys.splice(oldIndex, 1);
    if (!movedKey) return;
    newMediaKeys.splice(newIndex, 0, movedKey);
    form.setFieldValue("mediaKeys", newMediaKeys);

    const newPreviewUrls = [...previewUrls];
    const [movedUrl] = newPreviewUrls.splice(oldIndex, 1);
    if (!movedUrl) return;
    newPreviewUrls.splice(newIndex, 0, movedUrl);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.onSubmit(onSubmit)(e);
      }}
    >
      {JSON.stringify(form.errors)}
      <Stack>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Text size="lg" fw="bold">
              Медиа
            </Text>
            <ImageDropzone
              multiple={true}
              handleSelect={handleFileSelect}
              handleRemove={handleRemove}
              handleReorder={handleReorder}
              previewUrls={previewUrls}
              loading={isUploadMultipleFilesPending}
              error={
                Object.values(uploadMultipleFilesErrors).join(", ") || null
              }
            />
          </Stack>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Text size="lg" fw="bold">
              Основное
            </Text>
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
          </Stack>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Text size="lg" fw="bold">
              Цены
            </Text>
            <NumberInput
              label="Полная цена"
              thousandSeparator=" "
              decimalSeparator=","
              decimalScale={2}
              key={form.key("fullPrice")}
              {...form.getInputProps("fullPrice")}
            />
            <NumberInput
              label="Цена"
              thousandSeparator=" "
              decimalSeparator=","
              decimalScale={2}
              key={form.key("price")}
              {...form.getInputProps("price")}
            />
          </Stack>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <NumberInput
              label="Количество"
              thousandSeparator=" "
              decimalSeparator=","
              decimalScale={3}
              key={form.key("quantity")}
              {...form.getInputProps("quantity")}
            />
          </Stack>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Group justify="space-between">
              <Text size="lg" fw="bold">
                Аттрибуты
              </Text>
              <Button
                leftSection={<IconPlus size={16} />}
                className="w-fit"
                variant="subtle"
                onClick={() =>
                  form.setFieldValue(
                    `attributes.${form.values.attributes?.length ?? 0}`,
                    {
                      id: null,
                      valueId: null,
                    }
                  )
                }
              >
                Добавить атрибут
              </Button>
            </Group>
            <DragDropContext
              onDragEnd={({ source, destination }) => {
                if (!destination) return;

                const items = Array.from(form.values.attributes ?? []);
                const [reorderedItem] = items.splice(source.index, 1);
                if (!reorderedItem) return;

                items.splice(destination.index, 0, reorderedItem);

                form.setFieldValue("attributes", items);
              }}
            >
              <Droppable droppableId="attributes" direction="vertical">
                {(provided) => (
                  <Stack
                    align="stretch"
                    justify="center"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {form.values.attributes?.map((attribute, index) => (
                      <Draggable
                        key={index}
                        index={index}
                        draggableId={`attribute-${index}`}
                      >
                        {(provided, snapshot) => (
                          <Paper
                            withBorder
                            ref={provided.innerRef}
                            shadow={snapshot.isDragging ? "lg" : "xs"}
                            p="md"
                            {...provided.draggableProps}
                          >
                            <Box className="flex flex-col gap-4">
                              <Group gap="md" align="start">
                                <Stack justify="space-between" gap="xs">
                                  <ActionIcon
                                    variant="transparent"
                                    color="dark"
                                    size="xs"
                                    {...provided.dragHandleProps}
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
                                        form.values.attributes?.filter(
                                          (_, i) => i !== index
                                        )
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
                                      form.setFieldValue(
                                        `attributes.${index}.id`,
                                        id
                                      );
                                      form.setFieldValue(
                                        `attributes.${index}.valueId`,
                                        ""
                                      );
                                    }}
                                  />
                                  <GoodsAttributeValueCombobox
                                    label="Значение"
                                    id={attribute.valueId}
                                    setId={(id) =>
                                      form.setFieldValue(
                                        `attributes.${index}.valueId`,
                                        id
                                      )
                                    }
                                    disabled={!attribute.id}
                                  />
                                </Box>
                              </Group>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
          </Stack>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Group justify="space-between">
              <Text size="lg" fw="bold">
                Характеристики
              </Text>
              <Button
                leftSection={<IconPlus size={16} />}
                className="w-fit"
                variant="subtle"
                onClick={() =>
                  form.setFieldValue(
                    `characteristics.${form.values.attributes?.length ?? 0}`,
                    {
                      id: null,
                      valueIds: [],
                    }
                  )
                }
              >
                Добавить характеристику
              </Button>
            </Group>
            <GoodsCategoryCombobox
              id={form.values.categoryId ?? null}
              setId={(value) =>
                form.setFieldValue("categoryId", value ?? undefined)
              }
              label="Категория"
            />
            <DragDropContext
              onDragEnd={({ source, destination }) => {
                if (!destination) return;

                const items = Array.from(form.values.characteristics ?? []);
                const [reorderedItem] = items.splice(source.index, 1);
                if (!reorderedItem) return;

                items.splice(destination.index, 0, reorderedItem);

                form.setFieldValue("characteristics", items);
              }}
            >
              <Droppable droppableId="characteristics" direction="vertical">
                {(provided) => (
                  <Stack
                    align="stretch"
                    justify="center"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {form.values.characteristics?.map(
                      (characteristic, index) => (
                        <Draggable
                          key={index}
                          index={index}
                          draggableId={`characteristic-${index}`}
                        >
                          {(provided, snapshot) => (
                            <Paper
                              withBorder
                              ref={provided.innerRef}
                              shadow={snapshot.isDragging ? "lg" : "xs"}
                              p="md"
                              {...provided.draggableProps}
                            >
                              <Box className="flex flex-col gap-4">
                                <Group gap="md" align="start">
                                  <Stack justify="space-between" gap="xs">
                                    <ActionIcon
                                      variant="transparent"
                                      color="dark"
                                      size="xs"
                                      {...provided.dragHandleProps}
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
                                      label="Харатеристика"
                                      id={characteristic.id}
                                      setId={(id) => {
                                        form.setFieldValue(
                                          `characteristics.${index}.id`,
                                          id
                                        );
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
                              </Box>
                            </Paper>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
          </Stack>
        </Paper>
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
