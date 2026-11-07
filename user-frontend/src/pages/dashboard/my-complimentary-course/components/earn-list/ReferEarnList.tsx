import ReferOtherIcon from "@/svg/ReferOtherIcon";
import "./refer-earn-list.css";
import DownArrowPrimaryIcon from "@/svg/DownArrowPrimaryIcon";
import InviteModal from "@/pages/dashboard/profile/components/refer-earn/invite-friends/InviteModal";
import UseReferUserList from "../../hook/useReferUserList";
import { useEffect } from "react";

export default function ReferEarnList({ courseId }: ReferEarnListProps) {
    const { open, setOpen, isOpen, onOpenChange, onOpen, handleReferUser, referUserList } = UseReferUserList();

    useEffect(() => {
        if (courseId) {
            handleReferUser(courseId);
        }
    }, [courseId]);

    return (
        <>
            <div className={`refer-earn-btn-container ${open ? "open" : ""}`}>
                <button className="refer-earn-btn" onClick={onOpen}>
                    Earn by Referring Others <ReferOtherIcon />
                </button>
                <button className={`refer-earn-icon ${open ? "open" : ""}`} onClick={() => setOpen(!open)}><DownArrowPrimaryIcon /></button>
            </div>
            <div className={`refer-earn-list ${open ? "open" : ""}`}>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Referred to</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({ length: 10 }).map((_, index) => {
                                const user = referUserList[index];
                                if (user) {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.userDetails.firstName + " " + user.userDetails.lastName}</td>
                                            <td className="status success">
                                                <span>
                                                    Successful
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

            <InviteModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </>
    )
}

interface ReferEarnListProps {
    courseId: string;
}