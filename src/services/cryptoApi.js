import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_RAPIDAPI_BASE_URL;

const createRequest = (url) => ({ url: url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
