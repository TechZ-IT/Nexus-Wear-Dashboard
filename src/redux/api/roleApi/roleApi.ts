import { apiSlice } from "../apiSlice";


export const roleApi = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
          getRole: builder.query<any,void>({
               query: () => `/role`
          })
     })
})


export const {useGetRoleQuery} = roleApi