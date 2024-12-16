import { UpdateOneGoodsExportJob } from "~/components/admin/goods/export/jobs/UpdateOneGoodsExportJob";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    return <UpdateOneGoodsExportJob id={id} />;
}
