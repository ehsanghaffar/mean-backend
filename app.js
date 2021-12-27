const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Import Router
const authRoutes = require("./routes/user.routes");
const articleRoute = require("./routes/articleRoutes");

// Database Connection
const db = "mongodb://localhost:27017/lanjrud";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.send("Hello");
});
app.use("/api/users", authRoutes);
app.use("/api/articles", articleRoute);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
