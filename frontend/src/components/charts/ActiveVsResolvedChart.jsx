import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ActiveVsResolvedChart() {
  const data = {
    labels: ["Active Cases", "Resolved Cases"],
    datasets: [
      {
        label: "Cases",
        data: [30, 70], // dummy numbers
        backgroundColor: ["#dc3545", "#ff7f7f"],
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true, // keeps proper bar proportions
      }}
    />
  );
}
