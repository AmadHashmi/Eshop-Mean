const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routers/product");
const categoriesRouter = require("./routers/category");
const usersRouter = require("./routers/user");
const ordersRouter = require("./routers/order");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const app = express();
app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);
// routes
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
