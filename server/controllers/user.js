import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword)
      return res.status(400).json({ message: "Username or password invalid" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "dev-test-key",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Signin failed" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ message: "User already exists" });
    const encryptedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ name, email, password: encryptedPassword });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      "dev-test-key",
      { expiresIn : "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};
