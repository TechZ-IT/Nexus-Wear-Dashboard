import { Role } from "@/types/role";
import { apiSlice } from "../apiSlice";


export const roleApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          getRole: builder.query<Role[], void>({
               query: () => `/role`
          })
     })
})


export const { useGetRoleQuery } = roleApi