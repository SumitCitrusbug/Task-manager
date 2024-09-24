const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth.middelware");
//impoer controler
const {
  loginpage,
  read,
  registerPage,
} = require("../controller/userController");
const { taskPage, readtaskPage } = require("../controller/taskController");

router.get("/", auth, loginpage);
router.get("/register", registerPage);
router.get("/read", read);

router.get("/taskpage", auth, taskPage);
router.get("/readtask", auth, readtaskPage);

module.exports = router;
