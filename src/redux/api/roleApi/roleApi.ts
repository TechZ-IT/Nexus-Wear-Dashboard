import { apiSlice } from "../apiSlice";


export const roleApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          getAllRoles: builder.query({
               query: (params?: { page?: number; limit?: number; search?: string; status?: string }) => ({
                    url: `/role`,
                    params,
               }),
               providesTags: ["Role"],
          }),

          getRoleById: builder.query({
               query: (roleId) => `/role/${roleId}`
          }),

          deleteRole: builder.mutation({
               query: (roleId) => ({
                    url: `/role/${roleId}`,
                    method: "DELETE",
               })
          }),

          createRole: builder.mutation({
               query: (formData: FormData) => ({
                    url: '/role',
                    method: "POST",
                    body: formData
               }),
               invalidatesTags: ["Role"],
          }),
          
          updateRoleDetails: builder.mutation({
               query: ({ formData, roleId }) => ({
                    url: `/role/${roleId}`,
                    method: "PATCH",
                    body: formData
               }),
               invalidatesTags: ["Role"]
          }),
     })
})


export const { useGetAllRolesQuery, useGetRoleByIdQuery, useDeleteRoleMutation, useCreateRoleMutation, useUpdateRoleDetailsMutation, } = roleApi

