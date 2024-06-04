const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/route");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://patidarhimank005:oK91m6ehsk7gPu3Y@cluster0.kotwjr2.mongodb.net/")
  .then(() => console.log("Mongoose is connected..."))
  .catch((err) => console.log(err));

app.use('/api/v1', mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
