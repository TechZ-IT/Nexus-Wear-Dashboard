/* eslint-disable @next/next/no-img-element */

"use client"
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

const AdminForm = () => {
     const [image, setImage] = useState<string | null>(null);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
               setImage(URL.createObjectURL(file)); // temporary preview URL
          }
     };

     return (
          <Card className="p-4 rounded-sm gap-4">
               <h1 className="text-xl font-semibold ">Create Admin</h1>

               <form className="bg-white   grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left Form Section */}
                    <Card className="md:col-span-2 p-4 rounded-sm">
                         <div>
                              <label className="block text-sm font-medium mb-1">Name</label>
                              <Input
                                   type="text"
                                   name="name"
                                   placeholder="Enter Admin Name"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Email</label>
                              <Input
                                   type="email"
                                   name="email"
                                   placeholder="Enter Admin Email"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Phone</label>
                              <Input
                                   type="tel"
                                   name="phone"
                                   placeholder="Enter Phone Number"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">National Id</label>
                              <Input
                                   type="tel"
                                   name="nationalId"
                                   placeholder="Enter National Id"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Address</label>
                              <Input
                                   type="text"
                                   name="addressLine"
                                   placeholder="Enter Address"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium mb-1">Password</label>
                              <Input
                                   type="password"
                                   name="password"
                                   placeholder="Enter Password"
                                   className="h-12 w-full border border-gray-300 rounded-md "
                              />
                         </div>

                         <div className="space-y-2">
                              <Label htmlFor="role">Role</Label>
                              <Select>
                                   <SelectTrigger id="role" className="w-full py-6">
                                        <SelectValue placeholder="Select role" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="1">Admin</SelectItem>
                                        <SelectItem value="2">Manager</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>
                    </Card>

                    {/* Right Profile Image Section */}

                    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-sm p-4 relative">
                         {image ? (
                              <div className="relative">
                                   <img
                                        src={image}
                                        alt="Profile Preview"
                                        className="w-32 h-32 object-cover rounded-md mb-4"
                                   />
                                   {/* Delete button */}
                                   <button
                                        type="button"
                                        onClick={() => setImage(null)}
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
                         {/* image Input field style */}
                         <div className="w-full">
                              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition">
                                   <div className="h-12 flex flex-col items-center justify-center pt-b-6">
                                        <svg
                                             className="w-8 h-8 mb-2 text-gray-500"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             viewBox="0 0 24 24"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H16a5 5 0 011 9.9V16m-4-4v6m0 0l-2-2m2 2l2-2"
                                             />
                                        </svg>
                                        <p className="text-sm text-gray-500">
                                             <span className="font-semibold">Click to upload</span> or drag & drop
                                        </p>
                                        <p className="text-xs text-gray-400">PNG, JPG (max 2MB)</p>
                                   </div>
                                   <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="h-12 hidden"
                                   />
                              </label>
                         </div>
                    </div>


                    {/* Buttons */}
                    <div className="md:col-span-3 flex justify-end gap-2 ">
                         <Button
                              type="button"
                              className="bg-red-600 "
                         >
                              Discard
                         </Button>
                         <Button
                              type="submit"
                              className="bg-blue-600 "
                         >
                              Create
                         </Button>
                    </div>
               </form>
          </Card>
     );
};

export default AdminForm;
