const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//index page

async function loginpage(req, res) {
  res.render("login");
}
async function registerPage(req, res) {
  res.render("register");
}
async function read(req, res) {
  const user = await User.find({});
  res.render("read", { alluser: user });
}

async function getUser(req, res) {
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
async function getUserById(req, res) {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id.toString());
    user
      .save()
      .then(() => {
        return res.render("edit", { user: user });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  } catch (err) {
    return res.status(404).json({ error: "User Not found" });
  }
}

function createUser(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    try {
      const result = User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.redirect("/");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
}

//update user in the database
async function updateUser(req, res) {
  console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.redirect("/read");
}

//delete user from the database
async function deleteUser(req, res) {
  console.log(req.params.id);
  const user = await User.findByIdAndDelete({ _id: req.params.id.toString() });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.redirect("/read");
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });

    // Store the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    }); // 1 hour expiry

    res.redirect("/readtask");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function logout(req, res) {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  res.redirect("/");
}

module.exports = {
  loginpage,
  login,
  read,
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  registerPage,
  logout,
};
