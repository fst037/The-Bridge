import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

export const RatingRadar = ({ skills}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const skillNames = Object.keys(skills);
  const skillScores = Object.values(skills);

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
      scales: {
        r: {
          ticks: {
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

  if (!skills) {
    return (
      <div className="flex justify-center">
        <article className="flex flex-col text-center gap-4 md:gap-12 p-4 md:p-8 max-w-[500px] border border-gray-300 rounded-lg">
          <p className="text-lg font-[500]">
            ¡Uh oh! Parece que no has completado la encuesta.
          </p>
          <p>
            Sin la encuesta no podemos predecir tus habilidades. Puedes
            realizarla{" "}
            <Link
              className="text-blue-500 hover:underline hover:text-blue-600 active:text-blue-700"
              to="./encuesta"
            >
              aquí
            </Link>
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div>
        <canvas ref={chartRef}/>
      </div>
    </div>
  );
};
