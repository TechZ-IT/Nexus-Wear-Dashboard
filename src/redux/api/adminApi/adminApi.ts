import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          // adminApi.ts
          getAllAdmins: builder.query({
               query: ({ page, limit, search, status }) => ({
                    url: `/admin`,
                    params: {
                         page,
                         limit,
                         search,
                         status,
                    },
               }),
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
               invalidatesTags: ["Admin"]
          }),


     }),
});

export const { useGetAllAdminsQuery, useDeleteAdminMutation, useGetAdminByIdQuery, useCreateAdminMutation, useUpdateAdminDetailsMutation } = adminApi;
