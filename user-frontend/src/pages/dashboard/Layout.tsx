import { Outlet } from "react-router";
import SideBar from "./sidebar/SideBar";
import "./layout.css";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import HamburgerIcon from "@/svg/HamburgerIcon";
import BottomBar from "@/ui/tc-pp/BottomBar";
import SearchPrimaryIcon from "@/svg/SearchPrimaryIcon";
import NotificationPrimaryIcon from "@/svg/NotificationPrimaryIcon";
import AskAnythingModal from "@/ui/ask-anything/AskAnythingModal";
import { useDisclosure } from "@heroui/react";

export default function Layout() {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <>
            <div className="flex">
                <SideBar toggleMenu={toggleMenu} handleClose={setToggleMenu} />
                <MobileHeader toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
            </div>
            <ToastContainer />
        </>
    )
}


function MobileHeader({ setToggleMenu, toggleMenu }: MobileHeaderProps) {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();
    return <>
        <div className={`lg:w-[calc(100%-240px)] w-full layout-content-area ${toggleMenu ? "open" : "close"} flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-center p-4 mobile__header">
                    <div className="flex gap-4 items-center">
                        <button onClick={() => setToggleMenu(a => !a)} className="outline-none">
                            <HamburgerIcon />
                        </button>
                        <button onClick={onOpen} className="outline-none">
                            <SearchPrimaryIcon />
                        </button>
                        <button className="outline-none">
                            <NotificationPrimaryIcon />
                        </button>
                    </div>
                    <img src="/brand-logo.svg" alt="logo" className="mobile-logo" />
                </div>
                <Outlet />
            </div>
            <BottomBar />
        </div>
        <AskAnythingModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        />
    </>
}

interface MobileHeaderProps {
    setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>,
    toggleMenu: boolean
}