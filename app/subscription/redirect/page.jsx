"use client";

import { Spinner, useToast } from "@chakra-ui/react";
import FailedPayment from "@components/FailedPayment";
import SuccessfulPayment from "@components/SuccessfulPayment";
import { useHandleFlutterwavePaymentRedirectMutation } from "@slices/paymentApiSlice";
import { useEffect, useState } from "react";

const Redirect = () => {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(null)
  const chakraToast = useToast();
  const [fetchPaymentDetails] = useHandleFlutterwavePaymentRedirectMutation();
  const handlePaymentRedirect = async () => {
    const query_params = window.location.search;
    try {
      const res = await fetchPaymentDetails(query_params).unwrap();
      console.log(res)
      const { status, data } = res;
      if (status == 200) {
        setData(data);
        setSuccess(true)
      }
      else setSuccess(false)
    } catch (err) {
      console.error(err);
      let message = `Handle of payment redirect failed`;
      if (err.message) message = err.message;
      chakraToast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: false,
      });
    }
  };
  useEffect(() => {
    handlePaymentRedirect();
  }, []);
  if (success === true)
    return (
      <SuccessfulPayment data={data} />
    );
  if(success === false) return <FailedPayment />
  return <Spinner />;
};

export default Redirect;
