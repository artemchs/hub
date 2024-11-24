"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodsExportSchemaForm } from "./SingleGoodsExportSchemaForm";

export function CreateOneGoodsExportSchema() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.goods.export.schemas.createOne.useMutation({
    async onSuccess() {
      await apiUtils.goods.export.schemas.readMany.invalidate();
      router.push("/admin/goods/export/schemas");
    },
  });

  return (
    <SingleGoodsExportSchemaForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
    />
  );
}
