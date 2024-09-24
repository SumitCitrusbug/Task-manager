const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid email format");
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      if (value.length < 8)
        throw new Error("Password should be at least 8 characters long");
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
  }

  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
