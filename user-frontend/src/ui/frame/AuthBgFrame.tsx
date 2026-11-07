import { ToastContainer } from 'react-toastify';
import "./authbg-frame.css";
export default function AuthBgFrame({ children }: AuthBgFrameProp) {
    return (
        <>
            <div className="auth-bg-wrapper bg-[linear-gradient(135deg,#6633CC,#9933FF)] 2xl:min-h-[calc(100vh-106px)] min-h-[calc(100vh-76px)] bg-cover bg-no-repeat flex justify-center items-center px-4 py-8">
                <div className="auth-bg-blob" />
                {children}
            </div>
            <ToastContainer />
        </>
    )
}

interface AuthBgFrameProp {
    children: React.ReactNode
}