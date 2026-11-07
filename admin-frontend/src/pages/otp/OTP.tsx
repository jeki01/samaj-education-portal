import FormButton from "@/ui/button/FormButton";
import FormInput from "@/ui/input/FormInput";
import { Link } from "react-router";
import useLogin from "../login/hook/useLogin";

export default function OTP() {
    const { otp, apiStatus, isLoading } = useLogin();
    return (
        <>
            <div className="h-[90px] bg-white flex justify-center">
                <img src="/brand-logo.svg" alt="logo" className="w-[227px] h-[88px]" />
            </div>
            <div className="bg-[linear-gradient(90deg,#6633CC,#9933FF)] h-[calc(100vh-90px)] min-h-96 bg-cover bg-no-repeat flex justify-center items-center">
                <div className="bg-white rounded-[10px] drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] px-6 py-10 sm:w-[495px]">
                    <div className="text-primary  rounded-[10px] h-[78px] md:text-[36px] text-lg font-bold flex items-center justify-center">OTP</div>
                    <form onSubmit={otp.handleSubmit}>
                        <div className="my-4 inline-block w-full">
                            <FormInput
                                value={otp.values.otp}
                                onChange={otp.handleChange}
                                id="otp"
                                type="number"
                                placeholder="Enter OTP"
                                error={otp.errors.otp}
                            />
                        </div>
                        <FormButton isLoading={isLoading} text="Submit now" />
                        <Link to={"/"} className="text-center w-full block my-2 text-primary font-semibold">Back to Login</Link>
                        {
                            apiStatus?.message &&
                            <p className={`text-center my-2 ${apiStatus?.success ? "text-green-500" : "text-red-500"}`}>{apiStatus?.message}</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
