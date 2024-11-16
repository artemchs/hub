"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SingleGoodForm } from "./SingleGoodForm";

export function CreateOneGood() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.goods.createOne.useMutation({
    async onSuccess() {
      await apiUtils.goods.readMany.invalidate();
      router.push("/admin/goods");
    },
  });

  return (
    <SingleGoodForm mode="create" onSubmit={mutate} isPending={isPending} />
  );
}
