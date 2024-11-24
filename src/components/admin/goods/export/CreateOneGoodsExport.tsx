"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodsExportForm } from "./SingleGoodsExportForm";

export function CreateOneGoodsExport() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.goods.export.createOne.useMutation({
    async onSuccess() {
      await apiUtils.goods.export.readMany.invalidate();
      router.push("/admin/goods/export");
    },
  });

  return <SingleGoodsExportForm onSubmit={mutate} isPending={isPending} />;
}
