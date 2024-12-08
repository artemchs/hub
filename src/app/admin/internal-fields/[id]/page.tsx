"use client";

import { useParams, useRouter } from "next/navigation";
import { UpdateOneGoodsInternalField } from "~/components/admin/goods-internal-fields/UpdateOneGoodsInternalField";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const close = () => router.push("/admin/internal-fields");

  return (
    <UpdateOneGoodsInternalField
      close={close}
      onSuccess={async () => close()}
      id={params.id}
    />
  );
}
