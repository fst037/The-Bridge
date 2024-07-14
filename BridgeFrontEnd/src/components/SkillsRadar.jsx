import { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";
import "chart.js/auto";

export const SkillsRadar = ({ skills, className }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const skillNames = Object.keys(skills || {});
  const skillScores = Object.values(skills || {});

  const data = useMemo(
    () => ({
      labels: skillNames,
      datasets: [
        {
          data: skillScores,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        { data: [0], fill: false, borderColor: "rgba(0, 0, 0,0)" },
      ],
    }),
    [skillNames, skillScores]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          ticks: {
            display: false,
            beginAtZero: true,
            backdropColor: "transparent",
            fontColor: "black",
          },
          pointLabels: {
            fontSize: 12,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (!skills) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [skills, data, options]);

  return (
    <div className={`${className} flex justify-center align-center h-full`} style={{ maxHeight: '200px' }}>
      <div className="flex w-min">
        <canvas height="auto" width="auto" ref={chartRef} />
      </div>
    </div>
  );
};
