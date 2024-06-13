const userService = require("../service/userService");

async function registerUser(req, res) {
  try {
    const userData = req.body;

    const user = await userService.registerUser(userData);
    res.status(201).json({ message: "successfully registered", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error registering user", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    res.status(200).json({ message: "user successfully logged in", user });
  } catch (error) {
    res.status(500).json({ message: "error login user", error: error.message });
  }
}

module.exports = { registerUser ,loginUser};
