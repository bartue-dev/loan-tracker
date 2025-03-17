const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController")

indexRouter.get("/", indexController.getListOfPersons);

indexRouter.get("/addPerson", indexController.getAddPersonForm);

indexRouter.post("/addPerson", indexController.postAddPerson);

indexRouter.post("/:id/delete", indexController.postDeletePerson);

module.exports = indexRouter