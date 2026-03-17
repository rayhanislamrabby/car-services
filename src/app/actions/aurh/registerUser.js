"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNameObj.userCollection);

  const { name, email, password } = payload;

  console.log(payload);

  // validation
  if (!name || !email || !password) {
    return { success: false, message: "All fields required" };
  }

  // check user
  const existingUser = await userCollection.findOne({ email });

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  payload.password = hashedPassword;

  const result = await userCollection.insertOne(payload);

  return {
    success: true,
    insertedId: result.insertedId.toString(),
  };
};
