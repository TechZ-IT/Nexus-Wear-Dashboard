import { Role } from "@/types/role";
import { apiSlice } from "../apiSlice";


export const roleApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          getALLRole: builder.query<Role[], void>({
               query: () => `/role`,
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


export const { useGetALLRoleQuery, useGetRoleByIdQuery, useDeleteRoleMutation, useCreateRoleMutation, useUpdateRoleDetailsMutation, } = roleApi