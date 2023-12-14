const express = require("express");
const app = express();
const port = 5000;

const mongodb = require("./db");
mongodb();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("HEllo World Home Page");
});
app.use("/api", require("./routes/CreateUser"));

app.use("/api", require("./routes/DisplayData"));

app.use("/api", require("./routes/OrderDetails"));

app.listen(port, () => {
  console.log(`App listing on ${port}`);
});
