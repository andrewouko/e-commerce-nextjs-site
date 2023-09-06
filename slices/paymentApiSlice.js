// "use client";

import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFlutterwavePayment: builder.mutation({
      query: (data) => {
        return {
          url: `${window.location.origin}/api/payment`,
          method: "POST",
          body: data,
        };
      },
    }),
    handleFlutterwavePaymentRedirect: builder.mutation({
      query: (query_params) => {
        return {
          url: `${window.location.origin}/api/payment?${query_params}`,
          method: "GET"
        };
      },
    }),
  }),
});

export const { useCreateFlutterwavePaymentMutation, useHandleFlutterwavePaymentRedirectMutation } = paymentApiSlice;
