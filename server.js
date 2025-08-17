const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "API is running" });
});

app.get("/", (req, res) => {
  res.send("Task Manager API is running! Use /api/auth or /api/tasks");
});


const PORT = process.env.PORT || 5000;

console.log("Mongo URI from .env:", process.env.MONGO_URI);  // Debug line

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
