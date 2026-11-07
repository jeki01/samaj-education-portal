import NotificationIcon from "@/svg/NotificationIcon";
import "./search-bar.css";
import SearchIcon from "@/svg/SearchIcon";
import AskAnythingModal from "../ask-anything/AskAnythingModal";
import { useDisclosure } from "@heroui/react";

export default function SearchBar() {
    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    return (
        <>
            <div className="search-bar-wrapper">
                <div className="search-field-base cursor-pointer" onClick={onOpen}>
                    <div className="icon"><SearchIcon /></div>
                    <div className="search-text">Ask Anything</div>
                </div>
                <div className="notification-btn"><NotificationIcon /></div>
            </div>

            <AskAnythingModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    )
}
