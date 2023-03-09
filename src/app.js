const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

//Mongodb Connect:---
mongoose.connect("mongodb://127.0.0.1:27017/location");

const listSchema = mongoose.Schema({
  long: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const List = mongoose.model("List", listSchema);

app.post("/location", function (req, res) {
  try {
    const { lat, long, location, data } = req.body;

    const list = new List({
      lat,
      location,
      long,
      data,
    });

    if (!list) {
      return res.json({ message: "List does not Exist" });
    }
    list.save();
    console.log(list);
    return res.json({ message: "List created successfully" });
  } catch (err) {
    return res.json(err);
  }
});
app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
