"use client";
import { registerUser } from "@/app/actions/aurh/registerUser";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response.ok) {
        router.push("/");
        form.reset();
      } else {
        alert("Authentication Failed");
      }
    } catch (error) {
      console.log(error);

      alert("Authentication Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        <div className="mt-3.5">
          <SocialLogin></SocialLogin>
        </div>
        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link
            href={"/register"}
            className="text-orange-500 cursor-pointer ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
