const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const groupController = require("../controller/groupController");

router.post("/add", auth,groupController.addNewGroup);
router.get("/edit/:id", auth,groupController.editGroup);
router.post("/update/:id", auth,groupController.updateGroup);
router.delete("/delete/:id", auth,groupController.deleteGroup);
// router.post("/login", userController.loginUser);
router.get("/", auth,groupController.getAllGroups);
router.get("/test-mail",groupController.sendMailToTheGroup);

module.exports = router;