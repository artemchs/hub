"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import {
    CreateOneGoodsExportJobInput,
    UpdateOneGoodsExportJobInput,
} from "~/utils/validation/goods/export/jobs";
import { SingleGoodsExportJobForm } from "./SingleGoodsExportJobForm";

export function UpdateOneGoodsExportJob({ id }: { id: string }) {
    const apiUtils = api.useUtils();
    const router = useRouter();

    const { data, isFetching } = api.goods.export.jobs.readOne.useQuery({
        id,
    });

    const { mutate, isPending } = api.goods.export.jobs.updateOne.useMutation({
        async onSuccess() {
            await Promise.all([
                apiUtils.goods.export.jobs.readMany.invalidate(),
                apiUtils.goods.export.jobs.readOne.invalidate({ id }),
            ]);
            router.push("/admin/goods/export/jobs");
        },
    });

    const handleSubmit = (
        values: CreateOneGoodsExportJobInput | UpdateOneGoodsExportJobInput
    ) => {
        mutate({
            ...values,
            id,
        });
    };

    return (
        <SingleGoodsExportJobForm
            mode="update"
            initialValues={{
                id,
                name: data?.name ?? "",
                schemaId: data?.schemaId ?? "",
                schedule: data?.schedule ?? "",
            }}
            onSubmit={handleSubmit}
            isPending={isPending}
            isFetching={isFetching}
        />
    );
}
