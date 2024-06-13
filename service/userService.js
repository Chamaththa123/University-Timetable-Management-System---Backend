const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

//function to register user
async function registerUser(userData) {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      password: hashedPassword,
    });

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}

//function to login user
async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(passowrd, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "password is not valid" });
    }

    //generate jwt token
    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdDate: user.createdDate,
      },
      "secret_key",
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    res.status(500).json({ message: "error in user service" }, error);
  }
}

module.exports = { registerUser, loginUser };
