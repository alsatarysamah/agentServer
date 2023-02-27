const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { ordersCollection } = require("../models/index");
const orderRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

orderRouter.get("/order", bearer,  getAll);
orderRouter.post("/order", bearer,  creatRecord);
orderRouter.put("/order/:id",bearer,  updating);
orderRouter.delete("/order/:id",bearer,  deleting);
orderRouter.get("/order/:name", bearer, getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let neworder = req.body;
  let newRecored = await ordersCollection.create(neworder);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let orders = await ordersCollection.read();
  res.status(200).json(orders);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await ordersCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await ordersCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await ordersCollection.read(id);
  res.status(200).json(recored);
}
module.exports = orderRouter;
