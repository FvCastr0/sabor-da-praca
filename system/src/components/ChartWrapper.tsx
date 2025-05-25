"use client";

import dynamic from "next/dynamic";

export const DaySalesChartWrapper = dynamic(() => import("./DaySalesChart"), {
  ssr: false
});
