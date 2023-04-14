require("./db/mongoose");
const express = require("express");

const profileRouter = require("./router/profile");
const ItemRouter = require("./router/food_items");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(profileRouter);
app.use(ItemRouter);

app.listen(port, () => {
  console.log("Server is up on port on a NICE port: " + port);
});
