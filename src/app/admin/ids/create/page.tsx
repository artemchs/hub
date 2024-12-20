"use client";

import { useRouter } from "next/navigation";
import { CreateGoodsId } from "~/components/admin/goods-ids/CreateGoodsId";

export default function Page() {
    const router = useRouter();

    const close = () => {
        router.push("/admin/ids");
    };

    return <CreateGoodsId close={close} onSuccess={close} />;
}
