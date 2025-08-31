"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useGetAdminsQuery } from "@/redux/api/adminApi/adminApi";
import { loadUser } from "@/redux/features/authSlice";
import { AllAdmins } from "@/types/allAdmin";
import { useEffect } from "react";

export default function AdminList() {
    const { data, error, isLoading } = useGetAdminsQuery();
    console.log(data);
    const admins: AllAdmins[] = data?.data || [];

   


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading admins</p>;

    return (
        <div className="p-6 font-bold">
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <table className="min-w-full border-2  rounded shadow overflow-hidden">
                <thead className="bg-gray-100 ">
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {admins?.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 text-center">
                            <td className="border px-4 py-2">{user?.id}</td>
                            <td className="border px-4 py-2">{user?.name}</td>
                            <td className="border px-4 py-2">{user?.email}</td>
                            <td className="border px-4 py-2">{user?.phone}</td>
                            <td className="border px-4 py-2">{user?.role?.name}</td>
                            <td
                                className={`border px-4 py-2 ${user?.status === "active"
                                    ? "text-green-600 font-semibold"
                                    : "text-red-400 font-semibold"
                                    }`}
                            >
                                {user?.status}
                            </td>
                            <td className="border px-4 py-2">
                                {new Date(user?.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
