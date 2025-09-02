import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query<any, { page: number; limit: number }>({
            query: ({ page, limit }) => `/admin?page=${page}&limit=${limit}`,
        }),
        deleteAdmin: builder.mutation<any, string>({
            query: (adminId) => ({
                url: `/admin/${adminId}`,
                method: "DELETE",
            })
        })
    }),
});

export const { useGetAdminsQuery,useDeleteAdminMutation } = adminApi;
