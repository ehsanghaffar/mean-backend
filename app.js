const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");
const PORT = process.env.PORT || 8000;
const auth = require('./middleware/validateToken');

// Import Router
const authRoutes = require("./routes/user.routes");
const articleRoute = require("./routes/articleRoutes");

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
  res.status(200).send("Welcome to the API");
});

app.use("/api/users", authRoutes);
app.use("/api/articles", articleRoute);

// Run Server
db().then(async () => {  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
