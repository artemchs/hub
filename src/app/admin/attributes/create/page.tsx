"use client";

import { useRouter } from "next/navigation";
import { CreateOneGoodsAttribute } from "~/components/admin/goods-attributes/CreateOneGoodsAttribute";

export default function Page() {
    const router = useRouter();

    const close = () => {
        router.push("/admin/attributes");
    };

    return <CreateOneGoodsAttribute close={close} onSuccess={close} />;
}
