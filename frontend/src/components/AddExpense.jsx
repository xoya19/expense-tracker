import { useState } from "react";
import axios from "axios";
import styles from "./AddExpense.module.css";

function AddExpense({ onExpenseAdded }) {
    const [formData, setFormData] = useState({ amount: "", category: "", date: "", note: "" });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/expenses", formData)
        onExpenseAdded();
        setFormData({ amount: "", category: "", date: "", note: "" })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label}>Amount</label>
                    <input className={styles.input} type="number" placeholder="e.g. 1000" name="amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Category</label>
                    <input className={styles.input} type="text" placeholder="e.g. Groceries" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Date</label>
                    <input className={styles.input} type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Note</label>
                    <input className={styles.input} type="text" placeholder="e.g. Bought fruits" name="note" value={formData.note} onChange={handleChange} />
                </div>
                <button className={styles.button} type="submit">Add Expense</button>
            </form>
        </div>
    )


}
export default AddExpense;