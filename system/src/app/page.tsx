"use client";

import DaySalesClient from "@/components/DaySalesClient";
import { Header } from "@/components/Header";
import MonthSalesClient from "@/components/MonthSalesClient";
import SalesBetweenDates from "@/components/SalesBetweenDatesClient";
import { verifySession } from "@/lib/verifySession";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function verifyToken() {
      if (session?.accessToken !== undefined) {
        if ((await verifySession(session?.accessToken)) === "unauthorized") {
          signOut();
        }
      }
    }

    verifyToken();
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <Suspense fallback={<div>Carregando</div>}>
      <Header />
      <DaySalesClient />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100dvw",
          justifyContent: "left"
        }}
      >
        <div style={{ flex: "1 1 600px", maxWidth: "100%", margin: "1rem 0" }}>
          <MonthSalesClient />
        </div>

        <div style={{ flex: "1 1 360px", maxWidth: "100%" }}>
          <SalesBetweenDates />
        </div>
      </div>
    </Suspense>
  );
}
