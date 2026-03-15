"use client";

import { registerUser } from "@/app/actions/aurh/registerUser";
import Link from "next/link";
import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const user = {
      name,
      email,
      password,
    };

    console.log("Data", user);

    registerUser(user);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border pl-10 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border pl-10 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border pl-10 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link href={"/login"} className="text-orange-500 cursor-pointer ml-1">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
