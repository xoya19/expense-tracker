const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

