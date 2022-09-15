const items = require("./data/items.json");
const companies = require("./data/companies.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    await db.collection("items").insertMany(items);
    await db.collection("companies").insertMany(companies);
    console.log("working");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
