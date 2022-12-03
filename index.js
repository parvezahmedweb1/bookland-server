const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// ? use middle ware
app.use(cors());
app.use(express.json());
// ? db connection
const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const dbConnected = async (req, res) => {
  try {
    await client.connect();
    console.log("Database Connected...");
  } catch (error) {
    console.log("Can't Connected database!!!");
  }
};
dbConnected();
// ? db collection
const Categories = client.db("BOOK_LAND_SHOP").collection("Categories");
// ! get all categories data
app.get("/categories", async (req, res) => {
  try {
    const result = await Categories.find({}).toArray();
    res.send({
      status: true,
      data: result,
    });
  } catch (error) {
    res.send({
      status: false,
      error: error.message,
    });
  }
});
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
