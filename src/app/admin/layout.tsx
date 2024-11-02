import { auth } from "~/server/auth";
import { AdminShell } from "./_components/AdminShell";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
