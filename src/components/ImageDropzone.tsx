"use client";

import {
  Group,
  Text,
  rem,
  SimpleGrid,
  Image,
  Paper,
  ActionIcon,
  Flex,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconGripVertical,
} from "@tabler/icons-react";
import {
  Dropzone,
  type DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const MAX_MB = 5;

interface ImageDropzoneProps extends Omit<Partial<DropzoneProps>, "onChange"> {
  multiple?: boolean;
  handleSelect: (files: File[]) => void;
  handleRemove: (index: number) => void;
  handleReorder?: (oldIndex: number, newIndex: number) => void;
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
  handleReorder,
  ...props
}: ImageDropzoneProps) {
  const previews = previewUrls
    .filter((value) => value && value !== "")
    .map((url, index) => (
      <Draggable key={url} draggableId={url} index={index}>
        {(provided, snapshot) => (
          <Paper
            shadow={snapshot.isDragging ? "lg" : "xs"}
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="relative group h-40 w-40 flex items-center justify-center"
          >
            <Group className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <ActionIcon
                variant="filled"
                color="dark"
                {...provided.dragHandleProps}
                size="sm"
              >
                <IconGripVertical size={16} />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => handleRemove(index)}
                size="sm"
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
            <Image
              alt={`Preview ${index + 1}`}
              src={url}
              className="rounded-md object-cover"
            />
          </Paper>
        )}
      </Draggable>
    ));

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
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination || !handleReorder) return;
            handleReorder(source.index, destination.index);
          }}
        >
          <Droppable droppableId="image-previews" direction="horizontal">
            {(provided) => (
              <Flex
                gap="md"
                wrap="wrap"
                justify="flex-start"
                align="flex-start"
                direction="row"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {previews}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
