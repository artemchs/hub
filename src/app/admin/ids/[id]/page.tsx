"use client";

import { useParams, useRouter } from "next/navigation";
import { UpdateGoodsId } from "~/components/admin/goods-ids/UpdateGoodsId";

export default function Page() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const close = () => {
        router.push("/admin/ids");
    };

    return <UpdateGoodsId id={params.id} close={close} />;
}
