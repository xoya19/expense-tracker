import { Pie, Bar } from "react-chartjs-2";
import styles from "./ChartView.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ChartView({ expenses }) {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${(i * 360) / count}, 35%, 65%)`);
    }
    return colors;
  };
  const pieData = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: generateColors(Object.keys(categories).length),
    }]
  };
  const months = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", { month: "long" });
    acc[month] = (acc[month] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(months),
    datasets: [{
      label: "Monthly Spending",
      data: Object.values(months),
      backgroundColor: "rgba(122, 155, 181, 0.5)",
      borderColor: "rgba(122, 155, 181, 0.8)",
      borderWidth: 1,
      borderRadius: 6,
    }]
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Expense Distribution</h2>
      <div className={styles.chartsWrapper}>
        <div className={styles.chartBox}>
          <p className={styles.chartTitle}>By Category</p>
          <Pie data={pieData} />
        </div>
        <div className={styles.chartBox}>
          <p className={styles.chartTitle}>By Month</p>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
export default ChartView;