
export default function BottomBar() {
    return (
        <>
            <div className="h-[16px] bg-white flex flex-wrap justify-between px-4 items-center w-full max-w-[90%] mx-auto" style={{ zIndex: 5 }}>
                <p className="text-gray-500 text-[8px]">Copyright © 2025 Education. All rights reserved.</p>
                <div className="flex gap-x-2">
                    <a className="text-gray-500 text-[8px]" href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">T & C</a>
                    <span className="text-gray-500 text-[8px]">|</span>
                    <a className="text-gray-500 text-[8px]" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </div>
            </div>
        </>
    )
}
