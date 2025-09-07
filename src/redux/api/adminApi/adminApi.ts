import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query({
            query: ({ page, limit }) => `/admin?page=${page}&limit=${limit}`,
        }),
        deleteAdmin: builder.mutation({
            query: (adminId) => ({
                url: `/admin/${adminId}`,
                method: "DELETE",
            })
        }),
        getAdminById: builder.query({
            query: (adminId) => `/admin/${adminId}`
        })
    }),
});

export const { useGetAdminsQuery, useDeleteAdminMutation, useGetAdminByIdQuery } = adminApi;
