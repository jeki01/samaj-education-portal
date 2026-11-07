import SideNav from "@/constants/side-nav.json";
import { useLocation } from "react-router";

export default function LayoutHeader() {
    const url = useLocation();
    const currentPage = url.pathname.split("/").at(-1);
    return (
        <>
            <div className="bg-[#9933FF]">
                <div className="bg-white h-[90px] rounded-bl-[50px] ml-2 pl-2 flex items-center font-normal text-lg gap-x-16">
                    <img src="/brand-logo.svg" alt="logo" className="w-[12%] ml-4" />
                    {currentPage && SideNav.map(({ page_path, name, fill_icon, subLink }) => {
                        if (page_path === currentPage) {
                            return <div key={page_path} className="flex items-center gap-x-2 text-[14px] font-bold text-[#333399]"> {fill_icon && <img src={fill_icon} alt={name} />} {name} </div>
                        }
                        if (subLink.length > 0)
                           return subLink.map(({ name, page_path, fill_icon, head_name }) => {
                                if (page_path === currentPage) {
                                    return <div key={page_path} className="flex items-center gap-x-2 text-[14px] font-bold text-[#333399]"> {fill_icon && <img src={fill_icon} alt={name} />} {head_name} </div>
                                }
                                return null;
                            })
                        return null
                    })}
                </div>
            </div>
        </>
    )
}
