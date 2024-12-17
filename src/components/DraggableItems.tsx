import {
    DragDropContext,
    Draggable,
    type DraggableProvidedDragHandleProps,
    Droppable,
} from "@hello-pangea/dnd";
import { Paper, Stack } from "@mantine/core";

export function DraggableItems<T>({
    items,
    droppableId,
    onReorder,
    renderItem,
}: {
    items: T[];
    droppableId: string;
    onReorder: (items: T[]) => void;
    renderItem: (
        item: T,
        index: number,
        dragHandleProps: DraggableProvidedDragHandleProps | null
    ) => React.ReactNode;
}) {
    return (
        <DragDropContext
            onDragEnd={({ source, destination }) => {
                if (!destination) return;
                const newItems = Array.from(items);
                const [reorderedItem] = newItems.splice(source.index, 1);
                if (!reorderedItem) return;
                newItems.splice(destination.index, 0, reorderedItem);
                onReorder(newItems);
            }}
        >
            <Droppable droppableId={droppableId} direction="vertical">
                {(provided) => (
                    <Stack {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable
                                key={index}
                                index={index}
                                draggableId={`${droppableId}-${index}`}
                            >
                                {(provided, snapshot) => (
                                    <Paper
                                        withBorder
                                        ref={provided.innerRef}
                                        shadow={
                                            snapshot.isDragging ? "lg" : "xs"
                                        }
                                        p="md"
                                        {...provided.draggableProps}
                                    >
                                        {renderItem(
                                            item,
                                            index,
                                            provided.dragHandleProps
                                        )}
                                    </Paper>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
}
