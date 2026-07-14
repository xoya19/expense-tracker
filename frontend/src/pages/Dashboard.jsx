import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import ChartView from "../components/ChartView";
import FilterBar from "../components/FilterBar";

function Dashboard() {
  // ✅ 1. declare state first
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", fromDate: "", toDate: "" });

  const fetchExpenses = async () => {
    const response = await axios.get("http://localhost:5000/expenses");
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ 2. handleFilterChange exists now
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ 3. uniqueCategories after expenses is declared
  const uniqueCategories = [...new Set(expenses.map((e) => e.category))];

  // ✅ 4. filteredExpenses actually created
  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = filters.category === "" || expense.category === filters.category;
    const expenseDate = new Date(expense.date);
    const matchFrom = filters.fromDate === "" || expenseDate >= new Date(filters.fromDate);
    const matchTo = filters.toDate === "" || expenseDate <= new Date(filters.toDate);
    return matchCategory && matchFrom && matchTo;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <AddExpense onExpenseAdded={fetchExpenses} />
      <FilterBar
        filters={filters}
        onChange={handleFilterChange}
        categories={uniqueCategories}
      />
      {/* ✅ 5. passing filteredExpenses not expenses */}
      <ExpenseList expenses={filteredExpenses} onDelete={fetchExpenses} />
      <ChartView expenses={filteredExpenses} />
    </div>
  );
}

export default Dashboard;