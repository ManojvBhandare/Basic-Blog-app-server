const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

app.use(bodyparser.json());

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

const PORT = 3000;

app.listen(3000);
