import { NextResponse } from "next/server";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ schemaId: string }>;
  }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const schemaId = (await params).schemaId;

  if (!schemaId) {
    return NextResponse.json(
      { message: "Schema id is required" },
      { status: 400 }
    );
  }

  const schema = await db.goodsExportSchema.findUnique({
    where: { id: schemaId },
  });

  if (!schema) {
    return NextResponse.json({ message: "Schema not found" }, { status: 404 });
  }

  const lastExport = await db.goodsExport.findFirst({
    where: { schemaId },
    orderBy: { createdAt: "desc" },
  });

  if (!lastExport?.fileKey) {
    return NextResponse.json({ message: "No data" });
  }

  return NextResponse.redirect(
    `https://${env.NEXT_PUBLIC_CLOUDFRONT_HOSTNAME}/${lastExport.fileKey}`
  );
}
