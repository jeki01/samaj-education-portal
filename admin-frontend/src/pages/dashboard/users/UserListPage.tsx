import "./user-list.css";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@heroui/react";
import ColumnFrame from "../components/ColumnFrame";
import useUsers, { type UserItem } from "./hooks/useUsers";
import { formatDateToDDMMYYYY } from "@/helper/global.helper";
import SpinnerIcon from "@/svg/SpinnerIcon";

export default function UserListPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        users,
        pagination,
        loading,
        search,
        handleSearchChange,
        goToPage,
        selectedUser,
        fetchUserDetail,
        detailLoading,
    } = useUsers();

    function getFullName(u: typeof users[0]) {
        return [u.firstName, u.middleName, u.lastName].filter(Boolean).join(" ") || "—";
    }

    function getInitials(u: typeof users[0]) {
        const f = u.firstName?.[0] ?? "";
        const l = u.lastName?.[0] ?? "";
        return (f + l).toUpperCase() || "?";
    }

    function getLocation(u: typeof users[0]) {
        return [u.city, u.state].filter(Boolean).join(", ") || "—";
    }

    function getCategoryName(cat: UserItem["category"]) {
        if (!cat) return "—";
        if (typeof cat === "object" && cat.name) return cat.name;
        return String(cat);
    }

    const { page, totalPages, total, limit } = pagination;
    const startIdx = (page - 1) * limit;
    const pagesArr = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const start = Math.max(1, page - 2);
        return start + i;
    }).filter(p => p <= totalPages);

    return (
        <>
            <div className="p-8">
                {/* Header row with search */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#1e293b]">All Users</h1>
                        <p className="text-[13px] text-[#64748b] mt-1">
                            {total > 0 ? `${total} registered users` : "Loading…"}
                        </p>
                    </div>
                    <input
                        className="user-search-input"
                        type="text"
                        placeholder="Search name, email or mobile…"
                        value={search}
                        onChange={e => handleSearchChange(e.target.value)}
                    />
                </div>

                {/* Table */}
                <ColumnFrame
                    title="Users List"
                    col_type="start"
                    isAddBtn={false}
                    handleAddNew={() => {}}
                    base="!w-full !max-w-full"
                    headbar="rounded-tr-[12px]"
                    bodyClass="h-auto"
                >
                    <ul>
                        {/* Table head */}
                        <li className="flex justify-between items-center px-4 h-[52px] bg-[#6633CC0D] font-semibold border-t border-b border-[#CFD1DD]">
                            <span className="w-[46px] text-[12px] text-[#64748b] uppercase tracking-wide">#</span>
                            <span className="w-[220px] text-[12px] text-[#64748b] uppercase tracking-wide">User</span>
                            <span className="w-[130px] text-[12px] text-[#64748b] uppercase tracking-wide">Mobile</span>
                            <span className="w-[120px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Student Type</span>
                            <span className="w-[120px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Exam Type</span>
                            <span className="w-[110px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Mobile Verified</span>
                            <span className="w-[110px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Email Verified</span>
                            <span className="w-[160px] text-[12px] text-[#64748b] uppercase tracking-wide">Location</span>
                            <span className="w-[90px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Earning</span>
                            <span className="w-[100px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Joined</span>
                            <span className="w-[80px] text-[12px] text-[#64748b] uppercase tracking-wide text-center">Action</span>
                        </li>

                        {/* Table body */}
                        <div className="user-list-body">
                            {loading ? (
                                <li className="flex items-center justify-center h-[200px]">
                                    <SpinnerIcon />
                                </li>
                            ) : users.length === 0 ? (
                                <li className="flex items-center justify-center h-[200px] text-[#64748b] text-[14px]">
                                    No users found.
                                </li>
                            ) : (
                                users.map((user, idx) => (
                                    <li
                                        key={user._id}
                                        className="h-[60px] border-b border-[#CFD1DD] flex items-center justify-between px-4 hover:bg-[#6633CC0D]"
                                    >
                                        <div className="w-[46px] text-[14px] text-[#94a3b8]">
                                            {startIdx + idx + 1}
                                        </div>

                                        <div className="w-[220px] flex items-center gap-x-3">
                                            <div className="user-avatar">{getInitials(user)}</div>
                                            <div className="min-w-0">
                                                <div className="text-[14px] font-semibold truncate">{getFullName(user)}</div>
                                                <div className="text-[12px] text-[#64748b] truncate">{user.email || "—"}</div>
                                            </div>
                                        </div>

                                        <div className="w-[130px] text-[14px]">{user.mobileNo || "—"}</div>

                                        <div className="w-[120px] flex items-center justify-center">
                                            <span className="user-badge-type">{user.studentType || "—"}</span>
                                        </div>

                                        <div className="w-[120px] flex items-center justify-center">
                                            <span className="user-badge-type">{user.examType || "—"}</span>
                                        </div>

                                        <div className="w-[110px] flex items-center justify-center">
                                            <span className={user.isMobileVerified ? "user-badge-yes" : "user-badge-no"}>
                                                {user.isMobileVerified ? "✓ Yes" : "✗ No"}
                                            </span>
                                        </div>

                                        <div className="w-[110px] flex items-center justify-center">
                                            <span className={user.isEmailVerified ? "user-badge-yes" : "user-badge-no"}>
                                                {user.isEmailVerified ? "✓ Yes" : "✗ No"}
                                            </span>
                                        </div>

                                        <div className="w-[160px] text-[13px] text-[#64748b] truncate">
                                            {getLocation(user)}
                                        </div>

                                        <div className="w-[90px] text-[14px] text-center font-medium">
                                            ₹{(user.earning ?? 0).toLocaleString("en-IN")}
                                        </div>

                                        <div className="w-[100px] text-[12px] text-[#64748b] text-center">
                                            {user.createdAt ? formatDateToDDMMYYYY(user.createdAt) : "—"}
                                        </div>

                                        <div className="w-[80px] flex items-center justify-center">
                                            <button
                                                className="text-[12px] font-semibold text-[#6633CC] border border-[#6633CC] px-3 py-1 rounded-full hover:bg-[#EDE9FE] transition-colors"
                                                onClick={() => {
                                                    fetchUserDetail(user._id);
                                                    onOpen();
                                                }}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </div>
                    </ul>

                    {/* Pagination */}
                    {!loading && total > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-[#CFD1DD] flex-wrap gap-3">
                            <span className="text-[13px] text-[#64748b]">
                                Showing {startIdx + 1}–{Math.min(page * limit, total)} of {total} users
                            </span>
                            <div className="flex gap-2">
                                <button
                                    className="user-page-btn"
                                    disabled={page <= 1}
                                    onClick={() => goToPage(page - 1)}
                                >
                                    ←
                                </button>
                                {pagesArr.map(p => (
                                    <button
                                        key={p}
                                        className={`user-page-btn ${p === page ? "active-page" : ""}`}
                                        onClick={() => goToPage(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    className="user-page-btn"
                                    disabled={page >= totalPages}
                                    onClick={() => goToPage(page + 1)}
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    )}
                </ColumnFrame>
            </div>

            {/* User Detail Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={false} size="lg">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex items-center gap-3 border-b border-[#CFD1DD] pb-4">
                                {selectedUser && (
                                    <div className="user-avatar text-[18px] w-[48px] h-[48px]">
                                        {getInitials(selectedUser)}
                                    </div>
                                )}
                                <div>
                                    <div className="text-[17px] font-bold">
                                        {selectedUser ? getFullName(selectedUser) : "Loading…"}
                                    </div>
                                    {selectedUser && (
                                        <div className="text-[11px] text-[#94a3b8] font-normal font-mono mt-0.5">
                                            {selectedUser._id}
                                        </div>
                                    )}
                                </div>
                            </ModalHeader>

                            <ModalBody className="py-5">
                                {detailLoading || !selectedUser ? (
                                    <div className="flex items-center justify-center h-[160px]">
                                        <SpinnerIcon />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Email</span>
                                            <span className="user-detail-val">{selectedUser.email || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Mobile</span>
                                            <span className="user-detail-val">{selectedUser.mobileNo || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Student Type</span>
                                            <span className="user-detail-val">{selectedUser.studentType || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Exam Type</span>
                                            <span className="user-detail-val">{selectedUser.examType || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Mobile Verified</span>
                                            <span className={selectedUser.isMobileVerified ? "user-badge-yes" : "user-badge-no"}>
                                                {selectedUser.isMobileVerified ? "✓ Yes" : "✗ No"}
                                            </span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Email Verified</span>
                                            <span className={selectedUser.isEmailVerified ? "user-badge-yes" : "user-badge-no"}>
                                                {selectedUser.isEmailVerified ? "✓ Yes" : "✗ No"}
                                            </span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Country</span>
                                            <span className="user-detail-val">{selectedUser.country || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">State</span>
                                            <span className="user-detail-val">{selectedUser.state || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">City</span>
                                            <span className="user-detail-val">{selectedUser.city || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Pincode</span>
                                            <span className="user-detail-val">{selectedUser.pincode || "—"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Earning</span>
                                            <span className="user-detail-val">₹{(selectedUser.earning ?? 0).toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Category</span>
                                            <span className="user-detail-val">{getCategoryName(selectedUser.category)}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Welcome Shown</span>
                                            <span className="user-detail-val">{selectedUser.showWelcomeMessage ? "Pending" : "Shown"}</span>
                                        </div>
                                        <div className="user-detail-row">
                                            <span className="user-detail-key">Joined</span>
                                            <span className="user-detail-val">
                                                {selectedUser.createdAt ? formatDateToDDMMYYYY(selectedUser.createdAt) : "—"}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
