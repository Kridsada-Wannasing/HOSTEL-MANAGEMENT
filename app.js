const express = require("express");
const morgan = require("morgan");

const userRoutes = require("./routes/User");

require("./config/passport");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/user", userRoutes);

module.exports = app;
