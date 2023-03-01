const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { favoriteCollection, favoriteModel } = require("../models/index");
const favRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

favRouter.get("/fav", bearer, getAll);
favRouter.post("/fav", bearer, creatRecord);
favRouter.put("/fav/:id", bearer, updating);
favRouter.delete("/fav/:id", bearer, deleting);
favRouter.get("/fav/:name", bearer, getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newfav = req.body;
  newfav.userId = req.user.dataValues.id;
  newfav.itemId = req.body.itemId;
  let newRecored = await favoriteCollection.create(newfav);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let favs;
  console.log("**************************",req.query.userId);
  if (req.query.userId) {
    favs = await favoriteModel.findAll({ where: { userId: req.query.userId } });
  }
 else favs = await favoriteCollection.read();
  res.status(200).json(favs);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await favoriteCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await favoriteCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await favoriteCollection.read(id);
//   await favoriteModel.destroy({where:{}})

  res.status(200).json(recored);

}
module.exports = favRouter;
