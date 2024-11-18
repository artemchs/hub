"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodsImportForm } from "./SingleGoodsImportForm";

export function CreateOneGoodsImport() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.goods.import.createOne.useMutation({
    async onSuccess() {
      await apiUtils.goods.import.readMany.invalidate();
      router.push("/admin/goods/import");
    },
  });

  return <SingleGoodsImportForm onSubmit={mutate} isPending={isPending} />;
}
