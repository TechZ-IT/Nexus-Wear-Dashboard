import { Role } from "@/types/role";
import { apiSlice } from "../apiSlice";


export const roleApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          getALLRole: builder.query<Role[], void>({
               query: () => `/role`,
               providesTags: ["Role"],
          }),

          getCategoryById: builder.query({
               query: (categoryId) => `/category/${categoryId}`
          }),

          deleteCategory: builder.mutation({
               query: (categoryId) => ({
                    url: `/category/${categoryId}`,
                    method: "DELETE",
               })
          }),

          createCategory: builder.mutation({
               query: (formData: FormData) => ({
                    url: '/category',
                    method: "POST",
                    body: formData
               }),
               invalidatesTags: ["Role"],
          }),
          updateCategoryDetails: builder.mutation({
               query: ({ formData, categoryId }) => ({
                    url: `/category/${categoryId}`,
                    method: "PATCH",
                    body: formData
               }),
               invalidatesTags: ["Role"]
          }),
     })
})


export const { useGetALLRoleQuery } = roleApi