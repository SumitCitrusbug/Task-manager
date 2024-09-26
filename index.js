const express = require("express");
const app = express();
const mongodb = require("./connection.js");
const path = require("path");
var cookieParser = require("cookie-parser");

const taskRouter = require("./route/taskRoute.js");

const indexRouter = require("./route/IndexRoute.js");
const port = env.process.PORT;
const userRouter = require("./route/userRoute");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));

//ejs
app.set("view engine", "ejs");
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect MongoDB at default port 27017.
mongodb();

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
