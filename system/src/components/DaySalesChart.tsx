"use client";

import { Sale } from "@/types/Sale";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { colors } from "./ui/theme";

type Props = {
  data: Sale[];
};

const DaySalesChart: React.FC<Props> = sales => {
  const [hasData, setHasData] = useState<boolean>(false);
  const [hours, setHours] = useState<number[]>();
  const [intervals, setIntervals] = useState({
    categories: [] as number[],
    data: [] as number[]
  });

  useEffect(() => {
    if (sales.data.length <= 0) setHasData(false);
    else setHasData(true);
  }, [sales]);

  useEffect(() => {
    if (sales.data.length > 0) {
      const arrayOfSaleHours = sales.data.map(sale =>
        new Date(sale.date).getHours()
      );
      setHours(arrayOfSaleHours);
    }
  }, [sales]);

  useEffect(() => {
    if (hours && hours.length > 0) {
      const intervalHours = [] as number[];
      const intervalValues = [] as number[];

      hours.forEach(hour => {
        const verifyIfHasHour = intervalHours.find(e => hour === e);
        const verifyIfHasNextHour = intervalHours.find(e => hour === e + 1);
        if (!verifyIfHasHour && !verifyIfHasNextHour) intervalHours.push(hour);
      });

      const formattedHours = intervalHours.sort((a, b) => a - b);

      formattedHours.forEach(hour => {
        const formattedValues = [] as number[];
        sales.data.forEach(sale => {
          const saleHour = new Date(sale.date).getHours();
          if (saleHour === hour || saleHour === hour + 1) {
            formattedValues.push(sale.value);
          }
        });
        intervalValues.push(
          Number(
            formattedValues
              .reduce((acumulator, actualValue) => acumulator + actualValue, 0)
              .toFixed(0)
          )
        );
      });

      setIntervals({
        categories: [...formattedHours],
        data: [...intervalValues]
      });
    }
  }, [hours, sales.data]);

  const series = [
    {
      name: "Vendas",
      data: intervals.data
    }
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false
      }
    },
    title: {
      text: "",
      align: "left"
    },
    xaxis: {
      categories: intervals.categories
    },
    colors: [colors.primary]
  };

  return (
    <div
      style={{
        marginTop: "2rem"
      }}
    >
      {hasData && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      )}
    </div>
  );
};

export default DaySalesChart;
