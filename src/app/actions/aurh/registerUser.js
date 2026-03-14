"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNameObj.userCollection);

  const { name, email, password } = payload;

  // Required validation
  if (!name || !email || !password) {
    return { success: false, message: "All fields required" };
  }

  // Check existing user
  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  // 🔐 Password Hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    name,
    email,
    password: hashedPassword,
  };

  await userCollection.insertOne(user);

  return {
    success: true,
    message: "User registered successfully",
  };
};