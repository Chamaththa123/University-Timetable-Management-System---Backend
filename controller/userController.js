const userService = require("../service/userService");
const User = require("../model/user.model");

//register user function
async function registerUser(req, res) {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userService.registerUser(userData);
    res.status(201).json({ message: "successfully registered", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error registering user", error: error.message });
  }
}

//login function
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { registerUser, loginUser };
