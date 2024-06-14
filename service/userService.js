const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

//function to register user
async function registerUser(userData) {
  try {

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
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "secret_key",
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser };
