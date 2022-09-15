"use strict";

const express = require("express");
const morgan = require("morgan");
const { getAllItems } = require("./itemsHandler");
const {
  getAllCartItems,
  addCartItem,
  deleteCartItem,
  handlePurchase,
} = require("./cartHandler");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/items", getAllItems)
  .get("/api/cart", getAllCartItems)
  .post("/api/cart", addCartItem)
  .delete("/api/cart", deleteCartItem)
  .post("/api/purchase",handlePurchase)
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
