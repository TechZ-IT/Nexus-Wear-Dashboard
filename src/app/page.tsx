'use client'
import { loadUser, loginUser } from "@/redux/features/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface UserAuth {
  email: string
  password: string
}


const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.auth)
  console.log(user, loading, error);

  const { handleSubmit, register } = useForm<UserAuth>()

  const router = useRouter()


  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);



  const onSubmit: SubmitHandler<UserAuth> = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      toast.success("Login Successful 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err || "Login failed ");
    }
  };




  return (
    <div className="flex h-screen ">
      {/* Left Side */}
      <div className="w-1/2 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/loginBg1.jpg')] bg-cover" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center gap-4 text-white">
          <img src="/mainLogo.png" alt="Logo" className="w-40" />
          <h1 className="text-6xl font-extrabold text-black">NEXUS WEAR</h1>
        </div>
      </div>

      {/* Right Side (form area) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-[80%] max-w-[70vw] p-10 rounded  border border-gray-200 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            SIGN IN
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-[#1d242d] text-white py-3 rounded-sm  transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-center gap-2  mt-4 text-sm text-gray-500">
            <span>Dont have an account?</span>
            <Link href="" className="text-black font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
