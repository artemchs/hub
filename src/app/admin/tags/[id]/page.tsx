"use client";

import { useParams, useRouter } from "next/navigation";
import { UpdateOneGoodsTag } from "~/components/admin/goods-tags/UpdateOneGoodsTag";

export default function Page() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const close = () => {
        router.push("/admin/tags");
    };

    return <UpdateOneGoodsTag id={params.id} close={close} onSuccess={close} />;
}
