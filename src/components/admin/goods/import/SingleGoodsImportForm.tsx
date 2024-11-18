import { useForm, zodResolver } from "@mantine/form";
import { useSingleUpload } from "~/hooks/useUpload";
import {
  createOneGoodsImportSchema,
  type CreateOneGoodsImportInput,
} from "~/utils/validation/goods/import/createOneGoodsImport";
import { GoodsImportSchemaCombobox } from "./schemas/GoodsImportSchemaCombobox";
import { Button, FileButton, FileInput, Group, Loader } from "@mantine/core";
import Link from "next/link";
import { api } from "~/trpc/react";
import { IconCheck } from "@tabler/icons-react";

interface SingleGoodsImportFormProps {
  onSubmit: (values: CreateOneGoodsImportInput) => void;
  isPending?: boolean;
  isFetching?: boolean;
}

export function SingleGoodsImportForm({
  onSubmit,
  isPending,
  isFetching,
}: SingleGoodsImportFormProps) {
  const apiUtils = api.useUtils();

  const form = useForm({
    mode: "controlled",
    validate: zodResolver(createOneGoodsImportSchema),
    initialValues: {
      fileKey: "",
      schemaId: "",
    },
  });

  const { isUploadSingleFilePending, uploadSingleFile, uploadSingleFileError } =
    useSingleUpload();

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      form.setFieldValue("fileKey", "");
      return;
    }

    try {
      const { key } = await uploadSingleFile({
        dir: "Media",
        file,
      });

      form.setValues({
        ...form.values,
        fileKey: key,
      });
    } catch (error) {
      form.setFieldError("key", "Failed to upload file");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        form.onSubmit(onSubmit)(e);
      }}
      className="flex flex-col gap-4"
    >
      <Group justify="center">
        <FileButton
          onChange={handleFileChange}
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          {(props) => (
            <Button
              {...props}
              color={form.values.fileKey ? "teal" : "gray"}
              leftSection={form.values.fileKey ? <IconCheck size={16} /> : null}
            >
              {form.values.fileKey ? "Файл загружен" : "Выберите файл"}
            </Button>
          )}
        </FileButton>
      </Group>
      <GoodsImportSchemaCombobox
        withAsterisk
        id={form.values.schemaId}
        setId={(schemaId) => {
          form.setValues({
            ...form.values,
            schemaId: schemaId ?? "",
          });
        }}
        label="Схема импорта"
      />
      <Group justify="flex-end" mt="md">
        <Button variant="subtle" component={Link} href="/admin/goods/import">
          Отменить
        </Button>
        <Button
          type="submit"
          loading={isPending ?? isUploadSingleFilePending}
          disabled={!form.values.fileKey || form.values.fileKey === ""}
        >
          Импортировать
        </Button>
      </Group>
    </form>
  );
}
