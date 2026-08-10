import User from "../models/userModel.js";

export const findByEmail = async (email) => {
  return User.findOne({ email: email.toLowerCase().trim() });
};

export const findById = async (id) => {
  return User.findById(id).lean();
};

export const create = async ({ email, passwordHash }) => {
  const user = await User.create({
    email: email.toLowerCase().trim(),
    passwordHash,
    role: "member"
  });
  return user.toObject();
};