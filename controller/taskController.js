const Task = require("../model/task.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//index page

async function taskPage(req, res) {
  res.render("indextask");
}
async function readtaskPage(req, res) {
  console.log(req.user.id);
  const task = await Task.find({ createdBy: req.user.id });
  console.log(task);
  const userName = req.user.name;
  res.render("readtask", { alltask: task, userName: userName });
}

async function getTask(req, res) {
  return res.json("user");
  // const user = await User.find({});
  // user
  //   .then(() => {
  //     return res.json(user);
  //   })
  //   .catch((err) => {
  //     return res.status(500).json({ error: err.message });
  //   });
  // Retrieve all users from the database.
}
async function getTaskById(req, res) {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id.toString());
    task
      .save()
      .then(() => {
        return res.render("edittask", { task: task });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } catch (err) {
    return res.status(404).json({ error: "User Not found" });
  }
}

async function createTask(req, res) {
  try {
    const result = await Task.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    });
    return res.redirect("/readtask");
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.keys(err.errors).map((key) => {
        return {
          message: err.errors[key].message,
        };
      });
      return res.status(400).json({ error: errors });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while creating the task." });
  }
}

//update user in the database
async function updateTask(req, res) {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (req.body.title.length < 5 || req.body.description.length < 5) {
    return res.status(400).json({
      error: "Title and description must be at least 5 characters long",
    });
  }
  const user = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.redirect("/readtask");
}

//delete user from the database
async function deleteTask(req, res) {
  console.log(req.params.id);
  const user = await Task.findByIdAndDelete({ _id: req.params.id.toString() });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.redirect("/readtask");
}
//export async function
module.exports = {
  //   index,
  //   read,
  readtaskPage,
  taskPage,
  getTask,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};
