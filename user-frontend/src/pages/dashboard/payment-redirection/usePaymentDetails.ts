import type { ErrResp } from "@/config/axios-instance";
import axiosInstance from "@/config/axios-instance";
import { checkAuthUserHelper } from "@/helper/auth.helper";
// import { getPaymentDetails } from "@/services/purchase.service";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";

// const initialDetails: PaymentDetailsData = {
//   orderId: "",
//   status: "",
//   transactionId: ""
// }

export default function UsePaymentDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const { pathname } = useLocation();
  // const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsData>(initialDetails);

  // async function handlePaymentDetails(orderId: string) {
  //   try {
  //     const resp = await getPaymentDetails(orderId);
  //     const data = resp?.data;
  //     setPaymentDetails(data);
  //   } catch (error) {
  //     const err = error as ErrResp;
  //     toast.error(err?.response?.data?.message);
  //     checkAuthUserHelper(err);
  //   }
  // }

  // useEffect(() => {
  //   if (orderId)
  //     handlePaymentDetails(orderId);
  // }, [orderId])

  // import { useEffect, useState } from "react";
  // import axios from "axios";

  const [status, setStatus] = useState("PENDING");
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    // Start polling every 3 sec

    // eslint-disable-next-line prefer-const
    intervalId = setInterval(checkStatus, 3000);

    async function checkStatus() {
      const isCompetition = pathname.includes("competition");
      try {
        const res = await axiosInstance.get(`/v1/${isCompetition ? "test/check-payment-status" : "buy/check-status"}/${orderId}`);
        setStatus(res.data.status);
        setTransactionId(res.data.transactionId);

        // Agar completed ya failed ho gaya, polling stop
        if (res.data.status === "COMPLETED" || res.data.status === "FAILED") {
          clearInterval(intervalId);
        }
      } catch (error) {
        const err = error as ErrResp;
        toast.error(err?.response?.data?.message);
        checkAuthUserHelper(err);
      }
    };



    // First call immediately
    checkStatus();

    return () => clearInterval(intervalId);
  }, [orderId]);

  // useEffect(() => {
  //   if (orderId)
  //     PaymentRedirectPage(orderId);
  // }, [orderId])


  return {
    // paymentDetails,
    status,
    transactionId,
    orderId
  }
}

// type PaymentDetailsData = {
//   orderId: string,
//   status: string,
//   transactionId: string
// }