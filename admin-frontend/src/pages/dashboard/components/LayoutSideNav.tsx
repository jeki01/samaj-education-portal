import SideNav from "@/constants/side-nav.json";
import { Link, NavLink, useLocation } from "react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import LogoutIcon from "@/svg/LogoutIcon";
export default function LayoutSideNav() {
    const [currIdx, setCurrIdx] = useState<null | number>(null);
    const { pathname } = useLocation();
    const currentPage = pathname.split("/").at(-1);

    const handleLogout = () => {
        Cookies.remove("bauid")
        window.location.href = "/"
    }
    return (
        <>
            {/* h-[calc(100vh-90px)] */}
            <div className="xl:w-[283px] w-[220px] xl:pl-0 pl-[12px] bg-[linear-gradient(#9933FF,#6633CC)]  rounded-tr-[80px]">
                <div className="max-w-[241px] mt-[80px] ml-auto">
                    {
                        SideNav.map(({ name, icon_path, id, page_path, subLink }, idx) => {
                            return <div key={id}>
                                {
                                    subLink.length > 0 ? <div className={currentPage === page_path ? "active bg-[#333399] px-6 my-4 rounded-tl-full rounded-bl-full text-white flex items-center gap-x-4 h-[40px]" : " text-white flex items-center gap-x-4 h-[40px] px-6 my-4 hover:bg-[#333399] rounded-tl-full rounded-bl-full"}
                                        onClick={() => {
                                            setCurrIdx(idx)
                                            // handleClose(false)
                                        }}
                                    >
                                        <img src={icon_path} alt={name} />
                                        {name}
                                    </div>
                                        :
                                        <NavLink
                                            to={page_path}
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "active bg-[#333399] px-6 my-4 rounded-tl-full rounded-bl-full text-white flex items-center gap-x-4 h-[40px]" : "text-white flex items-center gap-x-4 h-[40px] px-6 my-4 hover:bg-[#333399] rounded-tl-full rounded-bl-full"
                                            }
                                            onClick={() => {
                                                setCurrIdx(idx)
                                                // handleClose(false)
                                            }}
                                        >
                                            <img src={icon_path} alt={name} />
                                            {name}
                                        </NavLink>
                                }
                                <div className={`flex flex-col gap-y-1 overflow-hidden ${currIdx === idx ? "h-auto my-1" : "h-0"}`}>
                                    {
                                        subLink.length > 0 && subLink.map(({ name, link }, idx) => {
                                            return <Link to={link} className={`h-[40px] hover:bg-[#333399] ml-4 flex items-center gap-x-[12px] rounded-tl-full rounded-bl-full sidebar__link__hover ${name} ${currentPage?.includes(link) ? "active bg-[#333399]" : (pathname === link || pathname === link + "/") ? "active bg-[#333399]" : ""}`} key={name + idx}
                                            >
                                                <div className="w-[16px]">
                                                    {/* {Icon && <Icon />} */}
                                                </div>
                                                <div className="text-white text-[14px] font-medium">{name}</div>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                    <button onClick={handleLogout} className="text-white w-full flex items-center gap-x-4 h-[40px] px-6 my-4 hover:bg-[#333399] rounded-tl-full rounded-bl-full"><LogoutIcon/> Logout</button>
                </div>
            </div>
        </>
    )
}
