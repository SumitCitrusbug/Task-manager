const mongoose = require("mongoose");

// Define the schema first
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 3) {
        throw new Error("Title must be at least 4 characters long");
      }
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 5) {
        throw new Error("description must be at least 8 characters long");
      }
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the model after the schema definition
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
