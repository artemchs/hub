"use client";

import { useParams, useRouter } from "next/navigation";
import { UpdateOneGoodsCharacteristic } from "~/components/admin/goods-characteristics/UpdateOneGoodsCharacteristic";

export default function Page() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const close = () => {
        router.push("/admin/characteristics");
    };

    return (
        <UpdateOneGoodsCharacteristic
            close={close}
            id={params.id}
            onSuccess={close}
        />
    );
}
