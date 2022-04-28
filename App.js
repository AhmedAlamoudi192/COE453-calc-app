const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
mongoose.connect("mongodb://127.0.0.1:27017/logging");
const dataSchema = new mongoose.Schema(
  {
    num1: Number,
    num2: Number,
    result: Number,
    operation: String,
  },
  { timestamps: { createdAt: "created_at" } }
);
//cors fix
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
const Add = mongoose.model("Add", dataSchema);
const Sub = mongoose.model("Sub", dataSchema);
const Mul = mongoose.model("Mul", dataSchema);
const Div = mongoose.model("Div", dataSchema);

app.use(express.json());

//serving the content
app.use("/", express.static("public"));

app.get("/history", async (req, res) => {
  const result = {};
  result["add"] = await Add.find({});
  result["sub"] = await Sub.find({});
  result["mul"] = await Mul.find({});
  result["div"] = await Div.find({});
  res.json(result);
});
app.get("/historyall", async (req, res) => {
  const date = req.query.date;
  const result = [];
  result.push(...(await Add.find({})));
  result.push(...(await Sub.find({})));
  result.push(...(await Mul.find({})));
  result.push(...(await Div.find({})));
  result.sort((i, j) => {
    const d1 = new Date(i.created_at);
    const d2 = new Date(j.created_at);
    return d1.getTime() < d2.getTime() ? 1 : -1;
  });
  if (date) {
    filteredResult = result.filter((item) => {
      return new Date(item.created_at).toISOString().split("T")[0] == date;
    });
    res.json(filteredResult);
  } else {
    res.json(result);
  }
});

app.post("/add", (req, res) => {
  const dbEntry = new Add({
    num1: req.body.num1,
    num2: req.body.num2,
    result: req.body.num1 + req.body.num2,
    operation: "+",
  });
  Add.insertMany(dbEntry);
  res.json({ result: req.body.num1 + req.body.num2 });
});
app.post("/sub", (req, res) => {
  const dbEntry = new Sub({
    num1: req.body.num1,
    num2: req.body.num2,
    result: req.body.num1 - req.body.num2,
    operation: "-",
  });
  Sub.insertMany(dbEntry);
  res.json({ result: req.body.num1 - req.body.num2 });
});
app.post("/mul", (req, res) => {
  const dbEntry = new Mul({
    num1: req.body.num1,
    num2: req.body.num2,
    result: req.body.num1 * req.body.num2,
    operation: "*",
  });
  Mul.insertMany(dbEntry);
  res.json({ result: req.body.num1 * req.body.num2 });
});
app.post("/div", (req, res) => {
  const dbEntry = new Div({
    num1: req.body.num1,
    num2: req.body.num2,
    result: req.body.num1 / req.body.num2,
    operation: "/",
  });
  Div.insertMany(dbEntry);
  res.json({ result: req.body.num1 / req.body.num2 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
