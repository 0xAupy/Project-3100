import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart({ reports }) {
  const counts = reports.reduce((acc, r) => {
    acc[r.crimeType] = (acc[r.crimeType] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: [
          "#dc3545",
          "#4a90e2",
          "#b02a37",
          "#f5a623",
          "#7ed321",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}
