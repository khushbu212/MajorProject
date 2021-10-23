const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const groupController = require("../controller/groupController");

router.post("/add", auth,groupController.addNewGroup);
// router.post("/login", userController.loginUser);
router.get("/", auth,groupController.getAllGroups);

module.exports = router;