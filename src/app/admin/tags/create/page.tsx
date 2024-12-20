"use client";

import { useRouter } from "next/navigation";
import { CreateOneGoodsTag } from "~/components/admin/goods-tags/CreateOneGoodsTag";

export default function Page() {
    const router = useRouter();

    const close = () => {
        router.push("/admin/tags");
    };

    return <CreateOneGoodsTag close={close} onSuccess={close} />;
}
