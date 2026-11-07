import { useSkillTransaction } from "@/hooks/useSkillTransaction";

export default function SkillTransactionTable() {
    const { skillTcnHistoryList } = useSkillTransaction();
    return (
        <div>
            <div className="txn-history-title">Transaction History</div>
            <table className="min-w-full border-separate border-spacing-y-4 text-[14px] text-[#9533FB]">
                <thead>
                    <tr className="bg-[#FAF5FF] font-semibold">
                        <th className="px-6 py-3 rounded-l-lg w-10 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Bundle Name
                        </th>
                        <th className="px-6 py-3 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Order ID
                        </th>
                        <th className="px-6 py-3  text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Txn ID
                        </th>
                        <th className="px-6 py-3 rounded-r-lg text-center whitespace-nowrap border-b-2 border-[#9533FB]">
                            Payment Status
                        </th>
                    </tr>
                </thead>
                <tbody className=" overflow-y-auto">
                    {skillTcnHistoryList.map(
                        (item, i) => (
                            <tr
                                key={`booking-list-${i + 1}`}
                                className="bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.17)] border border-[#9533FB] rounded-xl text-black"
                            >
                                <td className="px-6 py-2 font-medium w-10 whitespace-nowrap">
                                    {item?.BundleId?.BundleName || "-"}
                                </td>

                                <td className="px-6 py-2 wrap-break-word max-w-50">
                                    {item?.BundleId?.price ? `INR ${item?.BundleId?.price}/-` : "-"}
                                </td>

                                <td className="px-6 py-2 wrap-break-word max-w-45">
                                    {item?.merchantOrderId || "-"}
                                </td>

                                <td className="px-6 py-2 wrap-break-word min-w-55">
                                    {item?.transactionId || "-"}
                                </td>
                                <td className="px-6 py-2 text-[14px] text-center wrap-break-word min-w-55">
                                    {item?.paymentStatus || "-"}
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>

        </div>
    )
}
