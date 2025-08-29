"use client";

import { useGetAdminsQuery } from "@/redux/api/adminApi/adminApi";

export default function AdminList() {
    const { data, error, isLoading } = useGetAdminsQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading admins</p>;

    return (
        <div>
            <h1 className="text-xl font-bold">Admins</h1>
            <pre>{JSON.stringify(data ,null,2)}</pre>
        </div>
    );
}
