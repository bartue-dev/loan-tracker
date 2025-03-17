const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController")

exports.indexRouter.get("/", indexController.getAllName )