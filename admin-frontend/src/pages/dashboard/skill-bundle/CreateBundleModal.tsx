import MyEditor from "@/ui/editor/MyEditor";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/react";
import type { FormikProps } from "formik";
// import { useRef } from "react";
import type { BundleFormI } from "./hook/useSkill";

export default function CreateBundleModal({
    isOpen,
    onOpenChange,
    formik,
    courseList
}: CreateBundleModalProp) {
    // const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        formik.setFieldValue("image", file);
        formik.setFieldValue("imageName", file.name);
    };


    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation size="4xl" onClose={() => { formik.resetForm() }}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {formik.values?.id ? "Update Bundle" : "Create Bundle"}
                        </ModalHeader>

                        <ModalBody>
                            <div className="flex gap-x-4 mb-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-[14px] font-medium mb-2">
                                        Bundle Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        className="border rounded-[6px] h-[40px] px-4 text-[14px]"
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="text-[14px] font-medium mb-2">
                                        Bundle Price
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter price"
                                        name="price"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        className="border rounded-[6px] h-[40px] px-4 text-[14px]"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 w-full">
                                <label className="text-[14px] font-medium mb-2 block">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter tagline"
                                    name="tagline"
                                    onChange={formik.handleChange}
                                    value={formik.values.tagline}
                                    className="border rounded-[6px] h-[40px] px-4 text-[14px] w-full"
                                />
                            </div>

                            <div className="flex gap-x-4 mb-4">
                                <div className="flex flex-col w-full max-w-[50%]">
                                    <label className="text-[14px] font-medium mb-2">
                                        Image
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="bundle-image"
                                    />

                                    <label
                                        htmlFor="bundle-image"
                                        className="border rounded-[6px] h-[40px] px-4 flex items-center cursor-pointer text-[14px]"
                                    >
                                        {formik.values.imageName
                                            ? "Change image"
                                            : "Upload image"}
                                    </label>

                                    {
                                        // formik.values.imageName.includes(".com") &&
                                        <span className="text-[12px] text-gray-500 break-words">{formik.values.imageName}</span>
                                    }
                                </div>


                                <div className="flex flex-col w-full">
                                    <label className="text-[14px] font-medium mb-2">
                                        Select Courses
                                    </label>

                                    <Select
                                        className="max-w-md"
                                        aria-label="Select Courses"
                                        placeholder="Select Courses"
                                        selectionMode="multiple"
                                        selectedKeys={formik.values.courseIds}
                                        onSelectionChange={(keys) => {
                                            formik.setFieldValue(
                                                "courseIds",
                                                Array.from(keys)
                                            );
                                        }}
                                    >
                                        {courseList.map((item) => (
                                            <SelectItem key={item.key}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div className="text-[14px] font-medium mb-2">
                                    Content
                                </div>
                                <MyEditor
                                    value={formik.values.about}
                                    onChange={(value) =>
                                        formik.setFieldValue("about", value)
                                    }
                                />
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <button
                                type="button"
                                onClick={() => formik.handleSubmit()}
                                className="px-6 py-2 bg-[linear-gradient(90deg,#6633CC,#9933FF)] text-white rounded"
                            >
                                Submit
                            </button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

interface CreateBundleModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
    formik: FormikProps<BundleFormI>;
    title?: string;
    courseList: { key: string, label: string }[]
}