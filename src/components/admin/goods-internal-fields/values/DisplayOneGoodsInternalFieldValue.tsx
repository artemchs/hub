"use client";

import { Skeleton } from "@mantine/core";
import { api } from "~/trpc/react";

export function DisplayOneGoodsInternalFieldValue({
  id,
}: {
  id: string | null | undefined;
}) {
  const { data, isLoading, isError } =
    api.internalFields.values.readOne.useQuery(
      { id: id! },
      {
        enabled: !!id,
      }
    );

  if (isLoading) {
    return <Skeleton height={8} className="flex w-full max-w-60" />;
  }

  if (isError) {
    return <span className="text-red-500">Ошибка загрузки</span>;
  }

  return data?.value ?? "Не найдено";
}
