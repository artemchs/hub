"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { SingleGoodsMediaForm } from "./SingleGoodsMediaForm";

export function CreateOneGoodsMedia() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.media.createOne.useMutation({
    async onSuccess() {
      await apiUtils.media.readMany.invalidate();
      router.push("/admin/media");
    },
  });

  return (
    <SingleGoodsMediaForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
    />
  );
}
