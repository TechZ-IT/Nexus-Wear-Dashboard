import { apiSlice } from "../apiSlice";

export const adminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query<any, void>({
            query: () => "/admin", 
        }),
    }),
});


export const  {useGetAdminsQuery} = adminApi



