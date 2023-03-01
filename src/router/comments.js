const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { commentCollection } = require("../models/index");
const commentRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

commentRouter.get("/comment", bearer,  getAll);
commentRouter.post("/comment", bearer,  creatRecord);
commentRouter.put("/comment/:id",bearer,  updating);
commentRouter.delete("/comment/:id",bearer,  deleting);
commentRouter.get("/comment/:name", bearer, getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newcomment = req.body;
  let newRecored = await commentCollection.create(newcomment);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let comments = await commentCollection.read();
  res.status(200).json(comments);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await commentCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await commentCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await commentCollection.read(id);
  res.status(200).json(recored);
}
module.exports = commentRouter;
