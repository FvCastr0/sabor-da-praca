"use client";

import DaySalesClient from "@/components/DaySalesClient";
import { Header } from "@/components/Header";
import MonthSalesClient from "@/components/MonthSalesClient";
import { verifySession } from "@/lib/verifySession";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken !== undefined) {
      if (!verifySession(session?.accessToken)) {
        signOut();
      }
    }

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

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
