"use client";

import { Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { createId } from "@paralleldrive/cuid2";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageDropzone } from "~/components/ImageDropzone";
import { env } from "~/env";
import { useSingleUpload } from "~/hooks/useUpload";
import {
  type CreateOneMediaInput,
  createOneMediaSchema,
} from "~/utils/validation/media/createOneMedia";
import {
  type UpdateOneMediaInput,
  updateOneMediaSchema,
} from "~/utils/validation/media/updateOneMedia";

interface SingleGoodsMediaFormProps {
  initialValues?: UpdateOneMediaInput;
  onSubmit: (values: CreateOneMediaInput | UpdateOneMediaInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
  mode: "create" | "update";
}

export function SingleGoodsMediaForm({
  initialValues,
  onSubmit,
  isPending,
  isFetching,
  mode,
}: SingleGoodsMediaFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const form = useForm({
    mode: "controlled",
    initialValues: initialValues ?? {
      name: "",
      key: "",
    },
    validate: zodResolver(
      mode === "create" ? createOneMediaSchema : updateOneMediaSchema
    ),
    onValuesChange(values) {
      if (values.key) {
        setPreviewUrl(
          `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${values.key}`
        );
      } else {
        setPreviewUrl("");
      }
    },
  });

  const { isUploadSingleFilePending, uploadSingleFile, uploadSingleFileError } =
    useSingleUpload();

  // Handle file selection and upload
  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const { key } = await uploadSingleFile({
        dir: "Media",
        file,
      });

      form.setValues({
        name: file.name,
        key: key,
      });
    } catch (error) {
      form.setFieldError("key", "Failed to upload file");
    }
  };

  // Handle file removal
  const handleRemove = () => {
    form.setValues({
      name: "",
      key: "",
    });
    setPreviewUrl("");
  };

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
      form.resetDirty(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4">
      <ImageDropzone
        multiple={false}
        handleSelect={handleFileSelect}
        handleRemove={() => handleRemove()}
        previewUrls={[previewUrl]}
        loading={isUploadSingleFilePending}
        error={uploadSingleFileError}
      />
      <TextInput
        withAsterisk
        label="Название"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Ключ"
        disabled
        key={form.key("key")}
        {...form.getInputProps("key")}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" component={Link} href="/admin/media">
          Отменить
        </Button>
        <Button
          type="submit"
          loading={isPending ?? isUploadSingleFilePending}
          disabled={!form.values.key || form.values.key === ""}
        >
          {mode === "create" ? "Создать" : "Сохранить"}
        </Button>
      </Group>
    </form>
  );
}
