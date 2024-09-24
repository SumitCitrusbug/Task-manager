const express = require("express");
const router = express.Router();
const auth = require("../middelware/auth.middelware");
//impoer controler
const {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
} = require("../controller/taskController");

router
  .get("/", getTask)
  .post("/", auth, createTask)
  .get("/:id", getTaskById)
  .get("/delete/:id", deleteTask)
  .post("/edit/:id", updateTask);
// .delete("/:id", deleteUser)
// .put("/:id", updateUser);

module.exports = router;
