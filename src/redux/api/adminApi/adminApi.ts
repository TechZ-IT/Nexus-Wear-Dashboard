import { AllAdmins } from "@/types/allAdmin";
import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query<AllAdmins, { page: number; limit: number }>({
            query: ({ page, limit }) => `/admin?page=${page}&limit=${limit}`,
        }),
        deleteAdmin: builder.mutation({
            query: (adminId) => ({
                url: `/admin/${adminId}`,
                method: "DELETE",
            })
        })
    }),
});

export const { useGetAdminsQuery, useDeleteAdminMutation } = adminApi;
