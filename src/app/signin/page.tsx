'use client'
import SigninForm from "@/components/signin-form";
import { GalleryVerticalEnd } from "lucide-react";


const SignIn = () => {

    return (

        // <div className="flex h-screen w-full">
        //     {/* Left Side */}
        //     <div className="w-1/2 relative flex items-center justify-center">
        //         <div className="absolute inset-0 bg-[url('/loginBg1.jpg')] bg-cover" />
        //         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        //         <div className="relative z-10 flex flex-col items-center gap-4 text-white">
        //             <img src="/mainLogo.png" alt="Logo" className="w-40" />
        //             <h1 className="text-6xl font-extrabold text-black">NEXUS WEAR</h1>
        //         </div>
        //     </div>

        //     {/* Right Side (form area) */}
        //     <div className="w-1/2 flex items-center justify-center bg-gray-50">
        //         <div className="w-[80%] max-w-[70vw] p-10 rounded  border border-gray-200 bg-white">
        //             <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        //                 SIGN IN
        //             </h2>
        //             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        //                 <input
        //                     {...register("email")}
        //                     type="email"
        //                     placeholder="Email"
        //                     className="p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
        //                 />
        //                 <input
        //                     {...register("password")}
        //                     type="password"
        //                     placeholder="Password"
        //                     className="p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
        //                 />
        //                 <button
        //                     type="submit"
        //                     className="bg-[#1d242d] text-white py-3 rounded-sm  transition-all duration-300"
        //                 >
        //                     Sign In
        //                 </button>
        //             </form>

        //             <div className="flex justify-center gap-2  mt-4 text-sm text-gray-500">
        //                 <span>Dont have an account?</span>
        //                 <Link href="" className="text-black font-medium hover:underline">
        //                     Sign Up
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>



        <div className="grid min-h-svh lg:grid-cols-2">

            <div className="lg:block  hidden relative ">
                <div className="flex  items-center h-full justify-center">
                    <div className="absolute inset-0 bg-[url('/loginBg1.jpg')] bg-cover" />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                    <div className=" z-10 flex flex-col items-center gap-4 text-white">
                        <img src="/mainLogo.png" alt="Logo" className="w-40" />
                        <h1 className="text-6xl font-extrabold text-black">NEXUS WEAR</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SigninForm />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SignIn;

