import bcrypt from "bcrypt";
import { Ok, Err } from "../result.js";
import {
  findByEmail,
  findById,
  create
} from "../repositories/usersRepository.js";

const BCRYPT_ROUNDS = 12;
const normalizeEmail = (email) => email?.trim().toLowerCase();

export const signup = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    return Err({status: 400, message: "Email and password are required."
    });
  }
  if (password.length < 8) {
    return Err({status: 400, message: "Password must be at least 8 characters."
    });
  }

  const existingUser = await findByEmail(normalizedEmail);
  if (existingUser) {
    return Err({status: 409, message: "An account with that email already exists."
    });
  }
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await create({
    email: normalizedEmail,
    passwordHash
  });
  return Ok({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });
};

export const login = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    return Err({status: 400, message: "Email and password are required."
    });
  }

  const user = await findByEmail(normalizedEmail);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return Err({status: 401, message: "Incorrect email or password."
    });
  }

  return Ok({
    id: user._id.toString(),
    email: user.email,
    role: user.role
  });
};

export const getUserById = async (id) => {
  const user = await findById(id);
  if (!user) {
    return null;
  }
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role
  };
};