import { Link } from "react-router";
import UsePaymentDetails from "./usePaymentDetails";

export default function PaymentRedirection() {
    const { orderId, status, transactionId } = UsePaymentDetails()


    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div>
                    <h2 className="sm:text-2xl text-xl mb-4">Payment Status : <span className={`font-semibold ${status === "COMPLETED" ? "text-green-600" : status === "FAILED" ? "text-red-600" : "text-yellow-600"}`}>{status}</span></h2>
                    <div><b>Order ID :</b> {orderId}</div>
                    <div><b>Txn ID :</b> {transactionId}</div>
                    <Link to={"/home"} className="common-btn-ui px-4 sm:text-xl !text-[14px] !font-medium !py-3 !h-auto mt-4">Go to your dashboard</Link>
                </div>
            </div>
        </>
    )
}
