"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function TablePage() {
  const TableClient = dynamic(() => import("../../components/TableClient"), {
    ssr: false
  });

  return (
    <Suspense fallback={<div>Carregando</div>}>
      <TableClient />
    </Suspense>
  );
}
