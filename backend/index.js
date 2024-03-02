const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const pinRoute = require("./routes/pin");
const userRoute = require("./routes/user");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
