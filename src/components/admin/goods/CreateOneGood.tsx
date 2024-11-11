'use client'

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function CreateOneGood() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  const { mutate, isPending } = api.goods.createOne.useMutation({
    async onSuccess() {
      await apiUtils.goods.
      router.push("/admin/goods");
    },
  });
}