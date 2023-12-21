import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://reqres.in/api";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserData: builder.query({
      query: (page = undefined) => {
        const pageParam = page !== undefined ? `?page=${page}` : "";
        return `/users${pageParam}`;
      },
    }),
    getUserById: builder.query({
      query: (authDetails = {}) => {
        const { id, token } = authDetails;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return {
          url: `/users/${id}`,
          headers,
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetUserDataQuery,
  useGetUserByIdQuery,
} = api;
