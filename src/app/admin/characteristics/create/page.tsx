"use client";

import { useRouter } from "next/navigation";
import { CreateOneGoodsCharacteristic } from "~/components/admin/goods-characteristics/CreateOneGoodsCharacteristic";

export default function Page() {
    const router = useRouter();

    const close = () => {
        router.push("/admin/characteristics");
    };

    return <CreateOneGoodsCharacteristic close={close} />;
}
