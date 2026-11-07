import CalenderGreyIcon from "@/svg/CalenderGreyIcon";
import "./tansaction-history.css";
import { type TnxHistoryData } from "./hook/useTransactionHistory";
import { formatDDMMYYYY } from "@/helper/global.helper";
export default function TansactionHistory({ tnxList }: TransactionHistory) {

    return (
        <>
            <div className="txn-history-base">
                <div className="txn-history-title">Transaction History</div>
                <div className="txn-history-list-container">
                    {
                        tnxList.length > 0 && tnxList.map((item, i) => {
                            return <div className="txn-history-list-item" key={i}>
                                <div className="txn-history-details">
                                    <img src="/dummy-tnx.png" alt="txn-img" />
                                    <div className="txn-contents">
                                        <div className="txn-title truncate" title={item?.courseId?.courseName || "-"}>{item?.courseId?.courseName || "-"}</div>
                                        <div className="txn-validity"><CalenderGreyIcon /> Validity {item?.courseId?.courseValidity || "-"} days</div>
                                    </div>
                                </div>
                                <div className="txn-contents">
                                    <div className="txn-title truncate">OrderID</div>
                                    <div className="txn-validity">{item?.orderId || "-"}</div>
                                </div>
                                <div className={`text-[14px] ${item?.status === "COMPLETED" ? "text-green-600" : item?.status === "FAILED" ? "text-red-600" : "text-yellow-600"}`}>{item?.status}</div>
                                <div className="txn-history-date">{item?.createdAt && formatDDMMYYYY(item?.createdAt)}</div>
                                <div className="txn-history-price">₹{item?.courseId?.coursePrice || 0}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

interface TransactionHistory {
    tnxList: TnxHistoryData[]
}