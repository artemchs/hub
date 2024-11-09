"use client";

import { api } from "~/trpc/react";
import { SingleGoodsCharacteristicForm } from "./SingleGoodsCharacteristicForm";
import { useRouter } from "next/navigation";

export function CreateOneGoodsCharacteristic() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.characteristics.createOne.useMutation({
    async onSuccess() {
      await apiUtils.characteristics.readMany.invalidate();
      router.push("/admin/characteristics");
    },
  });

  return (
    <SingleGoodsCharacteristicForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
    />
  );
}
