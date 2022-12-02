const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// ? use middle ware
app.use(cors());
app.use(express.json());

// ? server create
app.get("/", async (req, res) => {
  try {
    res.send({
      success: true,
      message: "BookLand Server is Running...",
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is up and running on ${port} Port.`);
});
