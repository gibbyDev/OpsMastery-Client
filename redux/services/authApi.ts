import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8080/api/v1/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: 'signout',
        method: 'POST',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async onQueryStarted(_, { dispatch }) {
        try {
          localStorage.removeItem('access_token');
        } catch (err) {
          console.error('Error cleaning up during signout:', err);
        }
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSignoutMutation,
  useGetUsersQuery,
} = authApi; 