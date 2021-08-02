const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Router
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
// const authRouter = require("./routes/auth");
// const categoryRouter = require("./routes/categories");
// const productRouter = require("./routes/products");
// const brainTreeRouter = require("./routes/braintree");
// const orderRouter = require("./routes/orders");
// const usersRouter = require("./routes/users");
// const customizeRouter = require("./routes/customize");

// Import Auth middleware for check user login or not~
// const { loginCheck } = require("./middleware/auth");

// Database Connection
const db = "mongodb://localhost:27017/lanjrud";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Middleware
app.use(morgan("dev"));
// app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/auth", userRoutes);
app.use("/articles", articleRoutes);
// app.use("/api", authRouter);
// app.use("/api/user", usersRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/product", productRouter);
// app.use("/api", brainTreeRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/customize", customizeRouter);

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
