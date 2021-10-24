const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const emailController = require("../controller/emailController");


router.post("/schedule-email", emailController.add);
// router.post("/test", emailController.getListOfJob);
router.get("/", emailController.getListOfJob);
router.get("/edit/:id", emailController.edit);
router.post("/update/:id", emailController.update);
router.delete("/delete/:id", emailController.delete);

module.exports = router;