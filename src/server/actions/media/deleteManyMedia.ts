import { type PrismaTransaction } from "~/server/db";
import { readOneMedia } from "./readOneMedia";
import { deleteObject } from "~/server/utils/storage/delete-object";
import { storage } from "~/server/storage";
import { type DeleteManyMediaInput } from "~/utils/validation/media/deleteManyMedia";

export const deleteManyMedia = async ({
    tx,
    payload,
}: {
    tx: PrismaTransaction;
    payload: DeleteManyMediaInput;
}) => {
    // Get IDs where the value is true
    const selectedIds = Object.entries(payload.selectedRows)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id);

    const deleteResults = [];

    // Process each selected media item
    for (const id of selectedIds) {
        try {
            // Get media data
            const data = await readOneMedia({ tx, payload: { id } });

            // Delete from storage
            await deleteObject(storage, {
                Key: data.key,
            });

            // Delete from database
            const result = await tx.goodsMedia.delete({
                where: {
                    id,
                },
            });

            deleteResults.push({ id, success: true, data: result });
        } catch (error) {
            deleteResults.push({ id, success: false, error });
        }
    }

    return {
        deletedCount: deleteResults.filter((result) => result.success).length,
        results: deleteResults,
    };
};
