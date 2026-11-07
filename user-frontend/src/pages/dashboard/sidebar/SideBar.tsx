import { useAccount } from "@/context/account/AccountContext";
import AccountSwitchIcon from "@/svg/AccountSwitchIcon";
import CloseMenuIcon from "@/svg/CloseMenuIcon";
import ExploreNavIcon from "@/svg/ExploreNavIcon";
import HeartIcon from "@/svg/HeartIcon";
import LogoutIcon from "@/svg/LogoutIcon";
import RightArrowIcon from "@/svg/RightArrowIcon";
import UserProfileIcon from "@/svg/UserProfileIcon";
import { useDisclosure } from "@heroui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import AccountSwitchModal from "./AccountSwitchModal";
import { examPrepNavbar, skillPrepNavbar } from "./sidebar-content";
import "./sidebar.css";

export default function SideBar({ toggleMenu, handleClose }: { toggleMenu: boolean, handleClose: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currIdx, setCurrIdx] = useState<null | number>(null)
    const currentPage = pathname.split("/dashboard").at(-1);
    const { accountMode } = useAccount();

    const handleLogout = () => {
        Cookies.remove("buuid")
        window.location.href = "/login"
    }

    return (
        <>
            <div className={`w-[240px] bg-[#F7F1FF] h-screen layout-sidebar p-[32px] pt-4 flex flex-col justify-between ${toggleMenu ? "open" : "close"}`}>
                <div className="w-full mx-auto flex flex-col gap-y-[48px] content__wrapper">
                    <div className="flex justify-between items-center logo__header">
                        <img src="/brand-logo.svg" alt="logo" className="w-[143px] h-[64px]" />
                        <button onClick={() => handleClose(false)} className="close--btn"><CloseMenuIcon /></button>
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                        {/* <div className="uppercase text-[14px] text-[#3F3F3F] font-bold hidden md:block">OVERVIEW</div> */}
                        <div className="flex flex-col gap-y-1">
                            {
                                (accountMode === "exam" ? examPrepNavbar : skillPrepNavbar).map(({ name, link, Icon, subLink }, idx) => {
                                    return <div key={idx}>
                                        <Link
                                            to={link}
                                            className={`h-[40px] px-2 flex items-center justify-between md:rounded-[8px] rounded-none sidebar__link__hover ${name} ${currentPage?.includes(link) ? "active" : (pathname === link || pathname === link + "/") ? "active" : ""}`}
                                            onClick={() => {
                                                setCurrIdx(idx)
                                                handleClose(false)
                                            }}
                                        >
                                            <div className="flex items-center gap-x-[12px]">
                                                <div className="w-[16px]">
                                                    {Icon && <Icon />}
                                                </div>
                                                <div className="text-[#9533FB] text-[14px] font-medium">{name}</div>
                                            </div>
                                            {/* {
                                                subLink.length > 0 && <div className="link__expand__icon">
                                                    {
                                                        currIdx === idx ?
                                                            <MinusIcon />
                                                            :
                                                            <PlusIcon />
                                                    }
                                                </div>
                                            } */}
                                        </Link>
                                        <div className={`flex flex-col gap-y-1 overflow-hidden ${currIdx === idx ? "h-auto my-1" : "h-0"}`}>
                                            {
                                                subLink.length > 0 && subLink.map(({ name, link }, idx) => {
                                                    return <Link to={link} className={`h-[40px] flex items-center gap-x-[12px] md:rounded-[8px] rounded-none sidebar__link__hover ${name} ${currentPage?.includes(link) ? "active" : (pathname === link || pathname === link + "/") ? "active" : ""}`} key={name + idx}>
                                                        <div className="w-[16px]">
                                                            {/* {Icon && <Icon />} */}
                                                        </div>
                                                        <div className="text-[#202020] text-[14px] font-medium">{name}</div>
                                                    </Link>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-[10px]">
                    {
                        accountMode === "exam" &&
                        <Link
                            to={"/wishlist"}
                            className={`h-[40px] px-2 flex items-center gap-x-[12px] md:rounded-[8px] rounded-none sidebar__link__hover ${currentPage?.includes("/wishlist") ? "active" : ""}`}
                            onClick={() => {
                                setCurrIdx(null)
                                handleClose(false)
                            }}
                        >
                            <div className="w-[16px]">
                                <HeartIcon />
                            </div>
                            <div className="text-[#9533FB] text-[14px] font-medium">Wishlist</div>
                        </Link>
                    }
                    {
                        accountMode === "skills" &&
                        <Link
                            to={"/explore-bundle"}
                            className={`h-[40px] px-2 flex items-center gap-x-[12px] md:rounded-[8px] rounded-none sidebar__link__hover ${currentPage?.includes("/explore-bundle") ? "active" : ""}`}
                            onClick={() => {
                                setCurrIdx(null)
                                handleClose(false)
                            }}
                        >
                            <div className="w-[16px]">
                                <ExploreNavIcon />
                            </div>
                            <div className="text-[#9533FB] text-[14px] font-medium">Explore Bundles</div>
                        </Link>
                    }
                    <Link
                        to={"/profile"}
                        className={`h-[40px] px-2 flex items-center gap-x-[12px] md:rounded-[8px] rounded-none sidebar__link__hover ${currentPage?.includes("/profile") ? "active" : ""}`}
                        onClick={() => {
                            setCurrIdx(null)
                            handleClose(false)
                        }}
                    >
                        <div className="w-[16px]">
                            <UserProfileIcon />
                        </div>
                        <div className="text-[#9533FB] text-[14px] font-medium">Profile</div>
                    </Link>
                    <button onClick={handleLogout} className="h-[40px] px-2 flex items-center gap-x-[12px] md:rounded-[8px] rounded-none menu__logout__btn sidebar__link__hover">
                        <LogoutIcon />
                        <div className="text-[#9533FB] text-[14px] font-medium">Logout</div>
                    </button>
                    <button onClick={onOpen} className="bg-white h-[40px] px-2 flex items-center gap-x-[12px] md:rounded-[8px] rounded-none menu__logout__btn sidebar__link__hover shadow-[0_0px_2px_0px_#00000026]">
                        <AccountSwitchIcon />
                        <div className=" flex items-center justify-between w-full">
                            <div className="flex flex-col justify-start items-start">
                                <div className=" text-[#9533FB] text-[14px] font-medium">Bussibees</div>
                                <div className=" text-[#9533FB] text-[10px] font-medium">{accountMode}</div>
                            </div>
                            <RightArrowIcon />
                        </div>
                    </button>
                </div>
            </div>

            <AccountSwitchModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    )
}
