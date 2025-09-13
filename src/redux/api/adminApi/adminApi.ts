import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query({
            query: ({ page, limit }) => `/admin?page=${page}&limit=${limit}`,
            providesTags: ["Admin"],
        }),

        getAdminById: builder.query({
            query: (adminId) => `/admin/${adminId}`
        }),

        deleteAdmin: builder.mutation({
            query: (adminId) => ({
                url: `/admin/${adminId}`,
                method: "DELETE",
            })
        }),

        createAdmin: builder.mutation({
            query: (formData: FormData) => ({
                url: '/admin',
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Admin"],
        }),
        updateAdminDetails: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/admin/${id}`,
                method: "PATCH",
                body: formData
            }),
            invalidatesTags:["Admin"]
        }),


    }),
});

export const { useGetAdminsQuery, useDeleteAdminMutation, useGetAdminByIdQuery, useCreateAdminMutation,useUpdateAdminDetailsMutation } = adminApi;
