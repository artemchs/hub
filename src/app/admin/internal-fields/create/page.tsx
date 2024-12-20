"use client";

import { useRouter } from "next/navigation";
import { CreateOneGoodsInternalField } from "~/components/admin/goods-internal-fields/CreateOneGoodsInternalField";

export default function Page() {
    const router = useRouter();

    const close = () => router.push("/admin/internal-fields");

    return <CreateOneGoodsInternalField close={close} onSuccess={close} />;
}
