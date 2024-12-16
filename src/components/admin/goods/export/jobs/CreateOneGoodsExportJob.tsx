"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodsExportJobForm } from "./SingleGoodsExportJobForm";

export function CreateOneGoodsExportJob() {
    const apiUtils = api.useUtils();
    const router = useRouter();

    const { mutate, isPending } = api.goods.export.jobs.createOne.useMutation({
        async onSuccess() {
            await apiUtils.goods.export.jobs.readMany.invalidate();
            router.push("/admin/goods/export/jobs");
        },
    });

    return (
        <SingleGoodsExportJobForm
            mode="create"
            onSubmit={mutate}
            isPending={isPending}
        />
    );
}
