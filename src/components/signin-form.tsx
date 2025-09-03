'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { loadUser, loginAdmin } from "@/redux/features/authSlice"
import toast from "react-hot-toast"

interface UserAuth {
       email: string
       password: string
}

export default function SigninForm({ className, ...props }: React.ComponentProps<"form">) {

       const dispatch = useAppDispatch()
       const { user, loading, error } = useAppSelector((state) => state.auth)
       console.log(user, loading, error);

       const { handleSubmit, register } = useForm<UserAuth>()

       const router = useRouter()


       useEffect(() => {
              dispatch(loadUser());
       }, [dispatch]);



       const onSubmit: SubmitHandler<UserAuth> = async (data) => {
              try {
                     await dispatch(loginAdmin(data)).unwrap();
                     toast.success("Login Successful 🎉");
                     router.push("/");
              } catch (err) {
                     console.error(err)
                     toast.error("Login failed ");
              }
       };

       return (


              <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6 border p-2 rounded-md", className)} {...props}>
                     <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">Login to your account</h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                   Enter your email below to login to your account
                            </p>
                     </div>
                     <div className="grid gap-6">
                            <div className="grid gap-3">
                                   <Label htmlFor="email">Email</Label>
                                   <Input  {...register("email")} id="email" type="email" placeholder="example@gmail.com" required />
                            </div>
                            <div className="grid gap-3">
                                   <div className="flex items-center">
                                          <Label htmlFor="password">Password</Label>
                                   </div>
                                   <Input {...register("password")} id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                   Login
                            </Button>
                     </div>
                     <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                   Sign up
                            </a>
                     </div>
              </form>
       )
}
