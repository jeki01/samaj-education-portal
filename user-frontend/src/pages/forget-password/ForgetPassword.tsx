import AuthBgFrame from "@/ui/frame/AuthBgFrame";
import "./forget-pass.css";
import SignUpImgIcon from "@/svg/SignUpImgIcon";
import UserIcon from "@/svg/UserIcon";
import { Link } from "react-router";
import UseForgetPassword from "./hook/useForgetPassword";

export default function ForgetPassword() {
    const { formik } = UseForgetPassword()
    return (
        <>
            <AuthBgFrame>
                <div className="sign-up-base">
                    <div className="sign-up-img-wrapper">
                        <SignUpImgIcon />
                        <div className="sign-up-title mt-4">For<span>get</span></div>
                    </div>
                    <div className="w-full">
                        {/* form */}
                        <div className="sign-up-form-base">
                            <div className="mobile-input-field">
                                <div className="flex items-center gap-x-2 w-full">
                                    {/* <MobileIcon /> */}
                                    <UserIcon />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        name="email"
                                        className="w-full"
                                        value={formik.values.email}
                                        onChange={(e: { target: { value: string; }; }) => {
                                            formik.setFieldValue("email", e.target.value);
                                            // const value = e.target.value.replace(/\D/g, "");
                                            // if (value.toString().length <= 10) {
                                            //     formik.setFieldValue("mobileNo", value);
                                            // }
                                        }}
                                    />
                                </div>
                            </div>
                            {
                                (formik.touched.email && formik.errors.email) && <p className="field-error-msg">{formik.errors.email}</p>
                            }
                        </div>
                        <button onClick={formik.submitForm} className="common-btn-ui">Submit</button>
                        {/* {
                            isValidMob ?
                                :
                                <button disabled={true} className="common-btn-ui disabled">Submit</button>
                        } */}
                        <div className="signup-btm-text">Back to <Link to={"/login"}>Login</Link></div>
                    </div>
                </div>

            </AuthBgFrame>
        </>
    )
}
