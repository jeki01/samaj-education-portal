import WhiteCourseIcon from "@/svg/WhiteCourseIcon";
import { useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { SkillLearnContext } from "./context/SkillLearnContext";
import LectureDetailModal from "./LectureDetailModal";

export default function LectureTabSection() {
    const { handleSetLectureDetails, courseDetails } = useContext(SkillLearnContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#F8F1FF]">
                        <tr>
                            <th className="px-4 py-4 text-left">Sr No.</th>
                            <th className="px-4 py-4 text-left">Lectures</th>
                            <th className="px-4 py-4 text-left">Status</th>
                            <th className="px-4 py-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courseDetails.lectures.map((item, i) => (
                                <tr className="hover:bg-gray-50 border-b border-gray-300" key={i + 2}>
                                    <td className="px-4 py-4">{i + 1}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex gap-2 items-center">
                                            <WhiteCourseIcon color="#7D00FF" /> {item?.name}
                                        </div>
                                    </td>
                                    <td className={`px-4 py-4 font-semibold ${item?.isReadLecture ? "text-[#24C400]" : ""}`}>{item?.isReadLecture ? "Completed" : "-"}</td>
                                    <td className="px-4 py-4 text-blue-600 cursor-pointer">
                                        <button type="button" onClick={() => {
                                            handleSetLectureDetails(item);
                                            onOpen();
                                        }} className="rounded-lg text-white font-medium bg-[linear-gradient(180deg,#A674F9,#7235D8)] py-1 px-4">Learn</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <LectureDetailModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />

        </div>
    )
}
