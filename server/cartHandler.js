const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// get all cart items
const getAllCartItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db();
    const result = await db.collection("cart").find().toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};
// add a cartItem with the given itemId and amount
// have error response if item not found, incorrect info or no enough stock
const addCartItem = async (req, res) => {
  const { itemId, amount } = req.body;
  //when id is missing
  if (!itemId) {
    res.status(400).json({ status: 400, message: "Missing-Item-Id" });
  }
  // should show when missing or negative or zero or other type of amount
  if (!(amount > 0)) {
    res.status(400).json({ status: 400, message: "Wrong-or-missing-amount" });
  }

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();

    //get item stock and check
    const item = await db.collection("items").findOne({ _id: itemId });
    // show when stock is not enough for the order
    if (item.numInStock < amount) {
      return res.status(400).json({ status: 400, message: "Not-Enough-Stock" });
    }
    //modify item stock
    const modifyResult = await db
      .collection("items")
      .updateOne({ _id: itemId }, { $inc: { numInStock: -amount } });
    if (!(modifyResult.matchedCount && modifyResult.modifiedCount)) {
      return res.status(400).json({ status: 400, message: "Modify-Failure" });
    }
    //get cart item that has this itemId
    //add or increase amount with upsert
    const { _id, numInStock, ...restInfo } = item;
    const modifyItemResult = await db
      .collection("cart")
      .updateOne(
        { itemId },
        { $inc: { amount }, $set: { itemId, ...restInfo } },
        { upsert: true }
      );
    res.status(201).json({
      status: 201,
      data: req.body,
      message: `${itemId} has been added`,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

//delete the given amount of items from the cart
// if the amount is missing or greater then amount in cart, delete all of this item
const deleteCartItem = async (req, res) => {
  let { itemId, amount } = req.body;
  //when id is missing
  if (!itemId) {
    res.status(400).json({ status: 400, message: "Missing-Item-Id" });
  }

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();

    //get current cart info with this item
    let cartItem = await db.collection("cart").findOne({ itemId });

    //when this item is not in the cart
    if (!cartItem) {
      return res
        .status(404)
        .json({ status: 404, message: "CartItem-Not-Found" });
    }
    //when amount have a wrong type or negative
    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Wrong-Amount-Type" });
    }
    //set to delete all if don't have that much items
    if (amount > cartItem.amount) {
      amount = cartItem.amount;
    }
    //reduce the amount if there are some item left after the removal
    if (amount < cartItem.amount) {
      await db
        .collection("cart")
        .updateOne({ itemId }, { $inc: { amount: -amount } });
    } else {
      //delete this item if need to delete all
      await db.collection("cart").deleteOne({ itemId });
    }
    //set stock back
    const oldAmount = cartItem.amount;
    const deleted = await db
      .collection("items")
      .updateOne({ _id: itemId }, { $inc: { numInStock: amount } });
    res.status(200).json({
      status: 200,
      data: { ...cartItem, amount: oldAmount - amount },
      message: `${itemId} has been deleted`,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

//purchase all cart item by remove all cart items directly(assume been bought)
const handlePurchase = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db();
    const result = await db.collection("cart").deleteMany({});
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

module.exports = {
  getAllCartItems,
  addCartItem,
  deleteCartItem,
  handlePurchase,
};
