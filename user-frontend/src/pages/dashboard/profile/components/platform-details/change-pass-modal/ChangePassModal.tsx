// import CloseIcon from "@/svg/CloseIcon";
// import ButtonForm from "@/ui/button/form-button/ButtonForm";
import CloseEyeIcon from "@/svg/CloseEyeIcon";
import CloseMenuIcon from "@/svg/CloseMenuIcon";
import LockIcon from "@/svg/LockIcon";
import OpenEyeIcon from "@/svg/OpenEyeIcon";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";
import { useState } from "react";
// import InputPassword from "@/ui/input/password/InputPassword";
// import useChangePassword from "../../hooks/useChangePassword";

// import { useEffect } from "react";
import "./change-pass-modal.css";
import UseChangePassword from "../hook/useChangePassword";

export default function ChangePassModal({ isOpen, onOpenChange, onClose }: ChangePassModalProps) {
    // const { changePassword, isLoading, apiStatus } = useChangePassword(onClose);
    const { formik } = UseChangePassword(onClose)
    // useEffect(() => {
    //     changePassword.handleReset({
    //         newPassword: "",
    //         confirmPassword: ""
    //     })
    // }, [isOpen])

    // toggle password 
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState<boolean>(false);

    function togglePassword() { setIsPasswordShow(a => !a) };
    function toggleConfirmPassword() { setIsConfirmPasswordShow(a => !a) };

    return (
        <>
            <Modal
                isOpen={isOpen}
                closeButton={<div></div>}
                onOpenChange={onOpenChange}
                isDismissable={false}
                disableAnimation={true}
                placement="center"
                classNames={{
                    backdrop: "bg-[#EAEAEF66] backdrop-opacity-60",
                    base: "md:p-[40px] p-[20px] max-w-[592px] md:mx-0 mx-4",
                    body: "px-0"
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex items-center justify-between gap-1 md:mb-6 mb-0">
                                <span className="text-[#211C37] font-semibold md:text-[20px] text-[16px]">Change Password</span>
                                <button type="button" onClick={onClose}><CloseMenuIcon /></button>
                            </ModalHeader>
                            <ModalBody>
                                <div className="change-pass-form">
                                    <div>

                                        <div className="password-input-field">
                                            <div className="flex items-center gap-x-2 w-full">
                                                <LockIcon />
                                                <input
                                                    type={isPasswordShow ? "text" : "password"}
                                                    placeholder="Enter Password"
                                                    name="password"
                                                    className="w-full"
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <button onClick={togglePassword}>
                                                    {
                                                        isPasswordShow ?
                                                            <OpenEyeIcon />
                                                            :
                                                            <CloseEyeIcon />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            formik.touched.password && <p className="field-error-msg">{formik.errors.password}</p>
                                        }
                                    </div>
                                    <div>
                                        <div className="password-input-field">
                                            <div className="flex items-center gap-x-2 w-full">
                                                <LockIcon />
                                                <input
                                                    type={isConfirmPasswordShow ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                    className="w-full"
                                                    value={formik.values.confirmPassword}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <button onClick={toggleConfirmPassword}>
                                                    {
                                                        isConfirmPasswordShow ?
                                                            <OpenEyeIcon />
                                                            :
                                                            <CloseEyeIcon />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            formik.touched.confirmPassword && <p className="field-error-msg">{formik.errors.confirmPassword}</p>
                                        }
                                    </div>
                                    <button onClick={formik.submitForm} className="common-btn-ui">Submit</button>
                                </div>
                                {/* {
                                    apiStatus?.message &&
                                    <p className={`text-center my-2 ${apiStatus?.success ? "text-green-500" : "text-red-500"}`}>{apiStatus?.message}</p>
                                } */}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface ChangePassModalProps {
    isOpen: boolean,
    onOpenChange: () => void,
    onClose: () => void
}