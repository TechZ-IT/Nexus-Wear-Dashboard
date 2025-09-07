'use client'
import SigninForm from "@/components/signin-form";


const SignIn = () => {

    return (

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

