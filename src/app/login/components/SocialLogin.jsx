"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const handleSocialLogin = async (providerName) => {
    await signIn(providerName, {
      callbackUrl: "/", // redirect to home
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <button
        onClick={() => handleSocialLogin("google")}
        className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <button
        onClick={() => handleSocialLogin("github")}
        className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition"
      >
        <FaGithub />
        Continue with GitHub
      </button>
    </div>
  );
}
