import React, { useEffect, useRef, useMemo } from 'react';
import Chart from "chart.js/auto";
import 'chart.js/auto';

const TeamSkills = ({ skills, id }) => {

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
        {data: [0],
          fill: false,
          borderColor: 'rgba(0, 0, 0,0)',
        }
      ],
    }),
    [skillNames, skillScores]
  );

  const options = useMemo(
    () => ({
      responsive: false, // Disable responsive behavior
      maintainAspectRatio: false,
      scales: {
              r: {
                ticks: {
                  
                  beginAtZero: true,
                  backdropColor: 'transparent', // Set the ticks background to transparent
                  fontColor: 'black',
                },
                pointLabels: {
                    fontSize: 16 // Adjust the font size for labels on the points
                }
            }
        },
      plugins: {
            legend: {
                display: false // Disable legend
            }
        }
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
    <div>
      <div>
        <canvas height="auto" width="250" ref={chartRef}/>
      </div>
    </div>
  );
};

export default TeamSkills;