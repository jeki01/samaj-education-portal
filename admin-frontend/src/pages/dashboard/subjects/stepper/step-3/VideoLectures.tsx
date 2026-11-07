import ColumnFrame from "@/pages/dashboard/components/ColumnFrame";
import DeleteIcon from "@/svg/DeleteIcon";
import EditPrimaryIcon from "@/svg/EditPrimaryIcon";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import type { FormikProps } from "formik";
import { useState } from "react";
import LectureCreateModal from "./LectureCreateModal";
import type { LectureStepInitValI } from "./useVideoLectureStep";

export default function VideoLectures({
    formik,
    keyName,
    sectionTitle,
}: VideoLecturesProp) {
    const deleteModal = useDisclosure();
    const createModal = useDisclosure();

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const lectures = formik.values[keyName] as {
        name: string;
        time: string;
        about: string;
        link: string;
    }[];

    const handleSave = (val: {
        name: string;
        time: string;
        about: string;
        link: string;
    }) => {
        if (editIndex !== null) {
            const updated = [...lectures];
            updated[editIndex] = val;
            formik.setFieldValue(keyName, updated);
        } else {
            formik.setFieldValue(keyName, [...lectures, val]);
        }
        setEditIndex(null);
    };

    const handleDelete = () => {
        if (deleteIndex === null) return;
        const filtered = lectures.filter((_, i) => i !== deleteIndex);
        formik.setFieldValue(keyName, filtered);
        setDeleteIndex(null);
        deleteModal.onClose();
    };

    return (
        <>
            <ColumnFrame
                title={sectionTitle}
                col_type="start"
                handleAddNew={() => {
                    setEditIndex(null);
                    createModal.onOpen();
                }}
                base="!w-full !max-w-full"
                headbar="rounded-tr-[12px]"
                bodyClass="!min-h-[300px] !h-[300px]"
            >
                <div className="max-h-[290px] overflow-auto">
                    <table className="w-full border-collapse text-[14px]">
                        <thead className="sticky top-0 z-10 bg-[#e7dcfd]">
                            <tr className="bg-[#6633CC0D] border-y border-[#CFD1DD]">
                                <th className="px-4 py-3 text-left w-[50px]">S.No.</th>
                                <th className="px-4 py-3 text-left w-[150px]">Name</th>
                                <th className="px-4 py-3 text-left w-[150px]">Time</th>
                                <th className="px-4 py-3 text-left w-[150px]">Link</th>
                                <th className="px-4 py-3 text-left w-[300px]">About</th>
                                <th className="px-4 py-3 text-left w-[150px]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lectures.map(({ name, link, time, about }, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-[#CFD1DD] hover:bg-[#6633CC0D]"
                                >
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3 line-clamp-2">{name}</td>
                                    <td className="px-4 py-3">{time}</td>
                                    <td className="px-4 py-3 break-all">
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Visit
                                        </a>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="line-clamp-2 text-gray-700">
                                            {about}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-x-4">
                                            <button
                                                onClick={() => {
                                                    setEditIndex(idx);
                                                    createModal.onOpen();
                                                }}
                                            >
                                                <EditPrimaryIcon />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setDeleteIndex(idx);
                                                    deleteModal.onOpen();
                                                }}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ColumnFrame>

            <Modal isOpen={deleteModal.isOpen} onOpenChange={deleteModal.onOpenChange} disableAnimation>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Are you sure?</ModalHeader>
                            <ModalBody>
                                <p>Delete this lecture?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <LectureCreateModal
                isOpen={createModal.isOpen}
                onOpenChange={createModal.onOpenChange}
                initialValues={editIndex !== null ? lectures[editIndex] : undefined}
                onSave={handleSave}
            />
        </>
    );
}

interface VideoLecturesProp {
    formik: FormikProps<LectureStepInitValI>;
    keyName: keyof LectureStepInitValI;
    sectionTitle: string;
}
