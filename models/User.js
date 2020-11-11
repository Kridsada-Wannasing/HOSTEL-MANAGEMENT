const mongoose = require("mongoose");
const validator = require("validators");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    maxlength: [40, "Name must not be longer than 40 characters"],
    minlength: [10, "Name must not be at least 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Your email is incorrect."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: 8,
    select: false,
  },
});

userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);

module.exports = User;
