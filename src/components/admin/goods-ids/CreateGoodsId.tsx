"use client";

import { api } from "~/trpc/react";
import { GoodsIdForm } from "./GoodsIdForm";
import { useRouter } from "next/navigation";

export function CreateGoodsId() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.ids.createOne.useMutation({
    async onSuccess() {
      await apiUtils.ids.readMany.invalidate();
      router.push("/admin/ids");
    },
  });

  return <GoodsIdForm mode="create" onSubmit={mutate} isPending={isPending} />;
}
