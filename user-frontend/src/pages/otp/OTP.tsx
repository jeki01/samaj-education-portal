import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import "./otp.css";
import OTPImgIcon from "@/svg/OTPImgIcon";
import { InputOtp } from "@heroui/react";
import UseOTP from "./useOTP";

export default function OTP() {
    const { MobileNo, setUserOTP, UserOTP, EmailId, VerifyOTP, email, resendOTP } = UseOTP()
    return (
        <>
            <AuthBgFrame>
                <div className="otp-page-base">
                    <div className="otp-page-img-wrapper">
                        <OTPImgIcon />
                    </div>
                    <div className="w-full mt-4">
                        <div className="otp-title">OTP <span>Verification</span></div>
                        <div className="otp-info">Enter the OTP sent to {email ? EmailId : MobileNo}</div>
                        <div className="flex justify-center my-4">
                            <InputOtp
                                length={4}
                                value={UserOTP}
                                onValueChange={setUserOTP}
                                variant="bordered"
                                size="lg"
                            />
                        </div>
                        <div className="otp-option">Don't receive the OTP? <button onClick={resendOTP}> RESEND OTP</button></div>
                        <button onClick={VerifyOTP} className="common-btn-ui">Submit</button>
                    </div>
                </div>
            </AuthBgFrame>
        </>
    )
}
