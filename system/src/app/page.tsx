"use client";

import DaySalesClient from "@/components/DaySalesClient";
import { Header } from "@/components/Header";
import MonthSalesClient from "@/components/MonthSalesClient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <Suspense fallback={<div>Carregando</div>}>
      <Header />
      <DaySalesClient />
      <MonthSalesClient />
    </Suspense>
  );
}
