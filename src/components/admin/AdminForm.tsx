/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Admin } from "@/types/admin";
import { useGetRoleQuery } from "@/redux/api/roleApi/roleApi";
import { Role } from "@/types/role";
import { useCreateAdminMutation, useGetAdminsQuery } from "@/redux/api/adminApi/adminApi";
import toast from "react-hot-toast";

const AdminForm = () => {
     const [imagePreview, setImagePreview] = useState<string | null>(null);
     const router = useRouter();
     const { data } = useGetRoleQuery();
     const [createAdmin] = useCreateAdminMutation();

     const roles: Role[] = data || [];

     const {
          handleSubmit,
          register,
          formState: { errors },
     } = useForm<Admin>();

     const onSubmit: SubmitHandler<Admin> = async (data) => {
          const formData = new FormData();

          // append text fields
          formData.append("name", data.name);
          formData.append("email", data.email);
          formData.append("phone", data.phone);
          formData.append("nationalId", data.nationalId);
          formData.append("addressLine", data.addressLine);
          formData.append("password", data.password);
          formData.append("roleId", String(data.roleId));
          formData.append("status", data.status);

          // append file
          if (data.image && data.image[0]) {
               formData.append("image", data.image[0]);
          }


          try {
               const result = await createAdmin(formData).unwrap();
               console.log("Admin created:", result);
               router.push("/admin"); // redirect if needed
               toast.success("Admin Created Successfully")
          } catch (err) {
               console.error("Failed to create admin:", err);
          }
     };


     return (
          <Card className="p-4 rounded-sm gap-4 shadow-none">
               <h1 className="text-xl font-semibold">Create Admin</h1>

               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white grid grid-cols-1 md:grid-cols-3 gap-4"
               >
                    {/* Left Form Section */}
                    <Card className="md:col-span-2 p-4 gap-2 rounded-sm shadow-none">
                         <div>
                              <label className="block text-sm font-medium mb-1">Name</label>
                              <Input
                                   type="text"
                                   placeholder="Enter Admin Name"
                                   {...register("name", { required: "Name is required" })}
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.name && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.name.message}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Email</label>
                              <Input
                                   type="email"
                                   {...register("email", { required: "Email is required" })}
                                   placeholder="Enter Admin Email"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.email && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Phone</label>
                              <Input
                                   type="tel"
                                   {...register("phone", { required: "Phone is required" })}
                                   placeholder="Enter Phone Number"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.phone && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.phone.message}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">National Id</label>
                              <Input
                                   type="text"
                                   {...register("nationalId", { required: "National ID is required" })}
                                   placeholder="Enter National Id"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.nationalId && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.nationalId.message}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Address</label>
                              <Input
                                   type="text"
                                   {...register("addressLine", { required: "Address is required" })}
                                   placeholder="Enter Address"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.addressLine && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.addressLine.message}
                                   </p>
                              )}
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Password</label>
                              <Input
                                   type="password"
                                   {...register("password", { required: "Password is required" })}
                                   placeholder="Enter Password"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                              {errors.password && (
                                   <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                   </p>
                              )}
                         </div>

                         <div className="space-y-2">
                              <Label htmlFor="role">Role</Label>
                              <select
                                   id="role"
                                   {...register("roleId", { required: "Role is required" })}
                                   className="h-12 w-full border border-gray-300 rounded-md px-2"
                                   defaultValue=""
                              >
                                   <option value="" disabled>
                                        Select role
                                   </option>
                                   {roles.map((item) => (
                                        <option key={item.id} value={item.id}>
                                             {item.name}
                                        </option>
                                   ))}
                              </select>
                              {errors.roleId && (
                                   <p className="text-red-500 text-sm">{errors.roleId.message}</p>
                              )}
                         </div>

                         <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <select
                                   id="status"
                                   {...register("status", { required: "Status is required" })}
                                   className="h-12 w-full border border-gray-300 rounded-md px-2"
                                   defaultValue=""
                              >
                                   <option value="" disabled>
                                        Select status
                                   </option>
                                   <option value="active">Active</option>
                                   <option value="pending">Pending</option>
                                   <option value="inactive">Inactive</option>
                                   <option value="deleted">Deleted</option>
                              </select>
                              {errors.status && (
                                   <p className="text-red-500 text-sm">{errors.status.message}</p>
                              )}
                         </div>
                    </Card>

                    {/* Right Profile Image Section */}
                    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-sm p-4 relative">
                         {imagePreview ? (
                              <div className="relative">
                                   <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-full mb-4 border border-gray-300"
                                   />
                                   <button
                                        type="button"
                                        onClick={() => setImagePreview(null)}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-red-700"
                                   >
                                        ✕
                                   </button>
                              </div>
                         ) : (
                              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-sm mb-4">
                                   <span className="text-gray-400">Image</span>
                              </div>
                         )}

                         <div className="w-full">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
                                   <div className="flex flex-col items-center justify-center ">
                                        <p className="text-sm text-gray-500">
                                             <span className="font-semibold">Click to upload</span> or drag
                                             & drop
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG (max 2MB)</p>
                                   </div>
                                   <Input
                                        type="file"
                                        accept="image/*"
                                        {...register("image", {
                                             validate: {
                                                  lessThan2MB: (files) =>
                                                       files?.[0]?.size <= 2000000 || "File size should be less than 2MB",
                                             },
                                             onChange: (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (file) {
                                                       setImagePreview(URL.createObjectURL(file));
                                                  }
                                             },
                                        })}
                                        className="h-12 hidden"
                                   />
                                   {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image.message as string}</p>
                                   )}


                              </label>
                         </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-3 flex justify-end gap-2 ">
                         <Button type="button" className="bg-red-600 ">
                              Discard
                         </Button>
                         <Button type="submit" className="bg-blue-600 ">
                              Create
                         </Button>
                    </div>
               </form>
          </Card>
     );
};

export default AdminForm;
