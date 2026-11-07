import OTPImgIcon from "@/svg/OTPImgIcon";
import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import { InputOtp } from "@heroui/react";
import UseForgetOTPPassword from "./hook/useForgetOTPPassword";

export default function ForgetOTP() {
    const { UserOTP, setUserOTP, VerifyOTP, resendOTP, Email } = UseForgetOTPPassword()
    return (
        <>
            <AuthBgFrame>
                <div className="otp-page-base">
                    <div className="otp-page-img-wrapper">
                        <OTPImgIcon />
                    </div>
                    <div className="w-full mt-4">
                        <div className="otp-title">OTP <span>Verification</span></div>
                        <div className="otp-info">Enter the OTP sent to {Email}</div>
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
