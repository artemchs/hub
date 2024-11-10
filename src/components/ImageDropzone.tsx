"use client";

import { Group, Text, rem, SimpleGrid, Image, Paper } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  type DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

const MAX_MB = 5;

interface ImageDropzoneProps extends Omit<Partial<DropzoneProps>, "onChange"> {
  multiple?: boolean;
  handleSelect: (files: File[]) => void;
  handleRemove: (index: number) => void;
  previewUrls: string[];
  loading?: boolean;
  error?: string | null;
}

export function ImageDropzone({
  multiple = true,
  handleSelect,
  handleRemove,
  previewUrls,
  loading,
  error,
  ...props
}: ImageDropzoneProps) {
  const previews = previewUrls
    .filter((value) => value && value !== "")
    .map((url, index) => {
      return (
        <Paper
          shadow="xs"
          key={url}
          className="relative group h-40 w-40 flex items-center justify-center"
        >
          <Image
            alt={`Preview ${index + 1}`}
            src={url}
            className="rounded-md object-cover"
          />
          <button
            className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleRemove(index)}
            type="button"
          >
            <IconX size={16} />
          </button>
        </Paper>
      );
    });

  return (
    <div className="space-y-4">
      <Dropzone
        maxSize={MAX_MB * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={multiple}
        onDrop={handleSelect}
        loading={loading}
        {...props}
      >
        <Group
          justify="center"
          gap="xl"
          mih={120}
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>
          <div>
            <Text size="xl" inline>
              {multiple
                ? "Перетащите изображения сюда или нажмите, чтобы выбрать файлы"
                : "Перетащите изображение сюда или нажмите, чтобы выбрать файл"}
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              {multiple
                ? `Прикрепите столько файлов, сколько хотите, каждый файл не должен превышать ${MAX_MB} МБ`
                : `Прикрепите один файл размером не более ${MAX_MB} МБ`}
            </Text>
          </div>
          {error && (
            <Text c="red" size="sm">
              {error}
            </Text>
          )}
        </Group>
      </Dropzone>
      {previews.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 4 }}>{previews}</SimpleGrid>
      )}
    </div>
  );
}
