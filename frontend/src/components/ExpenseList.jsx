import axios from "axios";
import styles from "./ExpenseList.module.css";
function ExpenseList({ expenses, onDelete }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/expenses/${id}`);
    onDelete();
  }
  if (!expenses) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Expense List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Note</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (

            <tr key={expense.id}>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
              <td>{expense.note}</td>
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totalBar}>
        <span>Total</span>
        <span>₹{expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)}</span>
      </div>
    </div>
  );
};

export default ExpenseList;