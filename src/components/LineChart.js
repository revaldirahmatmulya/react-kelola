import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data, data2 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const destroyChart = () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };

    return () => {
      destroyChart();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Iuran",
              data: data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Pengeluaran",
              data: data2,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data, data2]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
