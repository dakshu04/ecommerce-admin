import { StoreModal } from "@/components/modals/store-modal";
import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>; // ✅ 1. params is a Promise
}) {
  const { storeId } = await params;     // ✅ 2. unwrap it

  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      <StoreModal />
      {children}
    </>
  );
}
