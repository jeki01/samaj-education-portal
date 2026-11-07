import MyEditor from "@/ui/editor/MyEditor";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Formik } from "formik";

interface LectureFormValues {
    name: string;
    time: string;
    link: string;
    about: string;
}

interface LectureCreateModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
    onSave: (lecture: LectureFormValues) => void;
    initialValues?: LectureFormValues;
}

export default function LectureCreateModal({
    isOpen,
    onOpenChange,
    onSave,
    initialValues,
}: LectureCreateModalProp) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" disableAnimation>
            <ModalContent>
                {(onClose) => (
                    <Formik<LectureFormValues>
                        enableReinitialize
                        initialValues={
                            initialValues ?? {
                                name: "",
                                time: "",
                                link: "",
                                about: "",
                            }
                        }
                        onSubmit={(values, { resetForm }) => {
                            onSave(values);
                            resetForm();
                            onClose();
                        }}
                    >
                        {({ values, handleChange, setFieldValue, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <ModalHeader>
                                    {initialValues ? "Edit Lecture" : "Add Lecture"}
                                </ModalHeader>

                                <ModalBody>
                                    <div className="flex gap-4 mb-2">
                                        <input
                                            name="name"
                                            placeholder="Name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="number"
                                            name="time"
                                            placeholder="Time"
                                            value={values.time}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>

                                    <input
                                        name="link"
                                        placeholder="Link"
                                        value={values.link}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded mb-2"
                                    />

                                    <MyEditor
                                        value={values.about}
                                        onChange={(val: string) =>
                                            setFieldValue("about", val)
                                        }
                                    />

                                    <button
                                        type="submit"
                                        className="mt-3 w-full bg-[linear-gradient(90deg,#6633CC,#9933FF)] text-white p-2 rounded"
                                    >
                                        Save
                                    </button>
                                </ModalBody>
                            </form>
                        )}
                    </Formik>
                )}
            </ModalContent>
        </Modal>
    );
}
