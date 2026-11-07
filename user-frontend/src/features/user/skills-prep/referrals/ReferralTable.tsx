import useReferralTable from "@/hooks/useReferralTable";
import PaginationUI from "@/ui/PaginationUI";

export default function ReferralTable() {
    const { referralTableList } = useReferralTable();
    return (
        <div>
            <table className="min-w-full border-separate border-spacing-y-4 text-[14px] text-[#9533FB]">
                <thead>
                    <tr className="bg-[#FAF5FF] font-semibold">
                        <th className="px-6 py-3 rounded-l-lg w-10 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Referrals
                        </th>
                        <th className="px-6 py-3 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Status
                        </th>
                        <th className="px-6 py-3  text-left whitespace-nowrap border-b-2 border-[#9533FB]">
                            Bundle
                        </th>
                        <th className="px-6 py-3 rounded-r-lg text-center whitespace-nowrap border-b-2 border-[#9533FB]">
                            You Earned
                        </th>
                    </tr>
                </thead>
                <tbody className=" overflow-y-auto">
                    {referralTableList.map(
                        (item, i) => (
                            <tr
                                key={`booking-list-${i + 1}`}
                                className="bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.17)] border border-[#9533FB] rounded-xl text-black"
                            >
                                <td className="px-6 py-2 font-medium w-10 whitespace-nowrap">
                                    {"Referral " + (i + 1)}
                                </td>

                                <td className="px-6 py-2 wrap-break-word max-w-50">
                                    {item?.name || "-"}
                                </td>

                                <td className="px-6 py-2 wrap-break-word max-w-45">
                                    {item?.status || "-"}
                                </td>

                                <td className="px-6 py-2 wrap-break-word min-w-55">
                                    {item?.bundleName || "-"}
                                </td>
                                <td className="px-6 py-2 text-center wrap-break-word min-w-55">
                                    {item?.commissionAmount ? `INR ${item?.commissionAmount}/-` : "-"}
                                </td>
                            </tr>
                        ),
                    )}
                </tbody>
            </table>

            <div className="flex flex-col items-center justify-center">
                <PaginationUI
                    total={1}
                    setCurrentPageCount={() => { }}
                    totalPages={1}
                />
                {/* <div className="text-[12px] mt-2">
                    {tableCount} to {toCount} of {totalRecords}
                </div> */}
            </div>
        </div>
    )
}
