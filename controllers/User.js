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
