"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodsImportSchemaForm } from "./SingleGoodsImportSchemaForm";

export function CreateOneGoodsImportSchema() {
    const apiUtils = api.useUtils();
    const router = useRouter();

    const { mutate, isPending } =
        api.goods.import.schemas.createOne.useMutation({
            async onSuccess() {
                await apiUtils.goods.import.schemas.readMany.invalidate();
                router.push("/admin/goods/import/schemas");
            },
        });

    return (
        <SingleGoodsImportSchemaForm
            mode="create"
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
