"use client";

import { useParams, useRouter } from "next/navigation";
import { UpdateOneGoodsAttribute } from "~/components/admin/goods-attributes/UpdateOneGoodsAttribute";

export default function Page() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const close = () => {
        router.push("/admin/attributes");
    };

    return (
        <UpdateOneGoodsAttribute
            close={close}
            id={params.id}
            onSuccess={close}
        />
    );
}
