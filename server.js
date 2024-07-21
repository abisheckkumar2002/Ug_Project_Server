// import packages
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import path from "path";

// import routes

import api from "./routes/api";
import admin from "./routes/admin";

// config
import config from "./config/config";

const app = express();
const server = http.createServer(app);

// compress responses
app.use(morgan("dev"));
app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    limit:10000,
    extended: false,
  })
);
app.use(bodyParser.json({ limit: '10mb', extended: true }));

//effectively mounts the Passport initialization middleware into the Express application.
app.use(passport.initialize());

// include passport stratagy
require("./config/passport").usersAuth(passport);
require("./config/passport").adminAuth(passport)


app.use("/", express.static(path.join(__dirname, "public")));

// Database connection
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.log(err));

  

app.use("/api", api);
app.use("/admin", admin);




app.get("/", (req, res) => {
  return res.send("User Service Working");
});

server.listen(config.port, function () {
  console.log(`server is running on port ${config.port}`);
});
