const jwt = require("jsonwebtoken");
const User = require("../models/User");

const hashedPassword = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

exports.register = async (req, res, next) => {
  const { email } = req.body;

  const target = await User.findOne({ email });

  if (target) throw new Error("Duplicate email!!");

  await User.create({
    ...req.body,
    password: hashedPassword(password, 8),
  });

  res.status(201).json({
    status: "success",
    message: "User has been created!!",
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const target = await User.findOne({
    email,
  }).select("+password");

  if (!target || !(await target.correctPassword(password, target.password))) {
    throw new Error("Incorrect email or password");
  }

  const payload = {
    id: target._id,
    email: target.email,
    name: target.name,
  };

  const token = jwt.sign(payload, "this-is-secret", {
    expiresIn: "7d",
  });

  res.status(200).json({
    message: "Login successfully!!",
    token,
  });
};
