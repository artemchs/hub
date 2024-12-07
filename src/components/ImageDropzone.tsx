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
  Box,
  Stack,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconGripVertical,
  IconGridDots,
} from "@tabler/icons-react";
import {
  Dropzone,
  type DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";

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

function SortableImage({
  url,
  index,
  handleRemove,
}: {
  url: string;
  index: number;
  handleRemove: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      shadow={isDragging ? "lg" : "xs"}
      radius="md"
      w={160}
      h={160}
      pos="relative"
      withBorder
      className="cursor-grab overflow-hidden"
      {...attributes}
      {...listeners}
    >
      <ActionIcon
        variant="filled"
        color="red"
        onClick={() => handleRemove(index)}
        pos="absolute"
        top={8}
        right={8}
        className="z-10"
      >
        <IconX size={16} />
      </ActionIcon>

      <Box h="100%" w="100%" pos="relative">
        <Image
          alt={`Preview ${index + 1}`}
          src={url}
          w="100%"
          h="100%"
          radius="md"
          fit="contain"
        />

        <Box
          pos="absolute"
          inset={0}
          className="flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
        >
          <IconGridDots size={24} color="white" />
        </Box>
      </Box>
    </Paper>
  );
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
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Add a small activation distance to prevent accidental drags
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !handleReorder) return;

    if (active.id !== over.id) {
      const oldIndex = previewUrls.indexOf(active.id as string);
      const newIndex = previewUrls.indexOf(over.id as string);
      handleReorder(oldIndex, newIndex);
    }
  };

  return (
    <Stack>
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
      {previewUrls.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]} // Add this line
        >
          <SortableContext
            items={previewUrls}
            strategy={horizontalListSortingStrategy}
          >
            <Flex
              gap="md"
              wrap="wrap"
              justify="flex-start"
              align="flex-start"
              direction="row"
              style={{ position: "relative" }} // Add this to ensure proper constraint
            >
              {previewUrls.map((url, index) => (
                <SortableImage
                  key={url}
                  url={url}
                  index={index}
                  handleRemove={handleRemove}
                />
              ))}
            </Flex>
          </SortableContext>
        </DndContext>
      )}
    </Stack>
  );
}
