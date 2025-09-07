/* eslint-disable @next/next/no-img-element */
'use client'
import { useGetAdminByIdQuery } from '@/redux/api/adminApi/adminApi';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminDetails = () => {
     const { id } = useParams();
     const { data, isLoading, isError } = useGetAdminByIdQuery(id);
     const router = useRouter()

     if (isLoading) return <p className="text-center py-10">Loading...</p>;
     if (isError) return <p className="text-center py-10 text-red-500">Failed to load admin details.</p>;

     if (!data) return <p className="text-center py-10">No admin found</p>;

     const {
          name,
          email,
          phone,
          nationalId,
          addressLine,
          image,
          status,
          role,
          createdAt,
          updatedAt,
     } = data;



     return (
          <div className="w-full mx-auto p-6 bg-white border border-gray-300 rounded ">

               <div className=" mb-6">
                    <img
                         src={image ?? "/profileImg.jpg"}
                         alt={name}
                         className="w-42 h-42 rounded-full border border-gray-300"
                    />
               </div>
               <div>
                    <div className="space-y-4">
                         <div>
                              <div className='flex items-center  gap-2'>
                                   <h2 className="text-2xl font-semibold">{name}  </h2>
                                   <span className='text-sm border rounded-2xl p-1'>{status}</span>
                              </div>
                              <p className="text-gray-600 font-bold">{email}</p>
                         </div>
                         <p>
                              <span className="font-semibold">Phone:</span> {phone}
                         </p>
                         <p>
                              <span className="font-semibold">National ID:</span> {nationalId}
                         </p>
                         <p>
                              <span className="font-semibold">Address:</span> {addressLine}
                         </p>
                         <p>
                              <span className="font-semibold">Role Description:</span> {role?.description}
                         </p>
                         <p>
                              <span className="font-semibold">Created At:</span>{' '}
                              {new Date(createdAt).toLocaleString()}
                         </p>
                         <p>
                              <span className="font-semibold">Updated At:</span>{' '}
                              {new Date(updatedAt).toLocaleString()}
                         </p>
                         <Button onClick={() => router.back()}>Go Back</Button>
                    </div>
               </div>



               {/* <div className=' space-y-2'>
                    <label htmlFor="email">Email</label>
                    <Input type="email" id='email' className='border rounded border-black w-full ' />
                    <label htmlFor="currentPass">Current Pass</label>
                    <Input type="password" id='currentPass' className='border rounded border-black w-full ' />
                    <label htmlFor="updatedPass">Updated Pass</label>
                    <Input type="password" id='updatedPass' className='border rounded border-black w-full ' />
               </div> */}


          </div>
     );
};

export default AdminDetails;
