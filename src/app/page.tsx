import React from "react";

const SignIn = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 relative flex items-center justify-center">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 bg-[url('/loginBg1.jpg')] bg-cover" />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-white">
          <img src="/mainLogo.png" alt="Logo" className="w-40" />
          <h1 className="text-6xl font-extrabold">NEXUS WEAR</h1>
        </div>
      </div>

      {/* Right Side (form area) */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[80%] max-w-md bg-white p-10 rounded shadow border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-center">SIGN IN</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
