import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CrimeTypeChart() {
  const data = {
    labels: ["Theft", "Assault", "Fraud", "Vandalism"],
    datasets: [
      {
        label: "Crime Types",
        data: [25, 15, 10, 5], // dummy numbers
        backgroundColor: ["#dc3545", "#ff7f7f", "#ffa07a", "#ffb347"],
      },
    ],
  };

  return (
    <Pie
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true, // ensures chart keeps its aspect ratio
      }}
    />
  );
}
