import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query({
            query: ({ page, limit }) => `/admin?page=${page}&limit=${limit}`,
            providesTags: ["Admin"],
        }),
        deleteAdmin: builder.mutation({
            query: (adminId) => ({
                url: `/admin/${adminId}`,
                method: "DELETE",
            })
        }),
        getAdminById: builder.query({
            query: (adminId) => `/admin/${adminId}`
        }),
        createAdmin: builder.mutation({
            query: (formData:FormData) => ({
                url: '/admin',
                method:"POST",
                body:formData
            }),
            invalidatesTags: ["Admin"],
        })
    }),
});

export const { useGetAdminsQuery, useDeleteAdminMutation, useGetAdminByIdQuery, useCreateAdminMutation } = adminApi;
