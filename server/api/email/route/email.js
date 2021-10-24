const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const emailController = require("../controller/emailController");


router.post("/schedule-email", emailController.add);
// router.post("/test", emailController.getListOfJob);
router.get("/", auth, emailController.getListOfJob);
router.get("/edit/:id", auth, emailController.edit);
router.post("/update/:id", auth, emailController.update);
router.delete("/delete/:id", auth, emailController.delete);

module.exports = router;