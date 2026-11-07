import { useDisclosure } from "@heroui/react";
import type { FormikProps } from "formik";
import { useRef, useState, type ChangeEvent } from "react";
// import type { CreateCourseFormValues } from "../gov-exam.types";
import type { VideoLectureInitValI, VideoLectureStepInitValI } from "../stepper/step-3/useVideoLectureStep";

export default function UseVideoLectures(formik: FormikProps<VideoLectureInitValI>, keyName: keyof VideoLectureStepInitValI) {
    const [isNewFeild, setisNewFeild] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [newVideoName, setNewVideoName] = useState("");
    const [newVideoLink, setNewVideoLink] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    // handle OnChange Video name
    function handleOnChangeVideoLectureName(e: ChangeEvent<HTMLInputElement>) {
        setNewVideoName(e.target.value)
    }

    // handle OnChange Video Link
    function handleOnChangeVideoLectureFile(e: ChangeEvent<HTMLInputElement>) {
        setNewVideoLink(e.target.value)
    }

    // handle Add new Video Lecture
    const handleAddVideoLecture = () => {
        if (newVideoName && newVideoLink) {
            const newVideoLecture = {
                videoLectureName: newVideoName,
                videoLectureLink: newVideoLink,
            };

            formik.setFieldValue(keyName, [
                ...(formik.values[keyName] || []),
                newVideoLecture,
            ]);

            // Clear input after adding
            setNewVideoName("");
            setNewVideoLink("");
            // close field
            setisNewFeild(false);
        }
    };

    // Add New Feild
    function handleAddNewField() {
        setisNewFeild(true)
    }

    // handle Edit Video Lecture
    function handleEditVideoLecture(index: number) {
        const video = formik.values[keyName][index];
        setNewVideoName(video.videoLectureName);
        setNewVideoLink(video.videoLectureLink);
        // if (typeof note.studyVideoLectureFile === "string") {
        //     alert("Cannot edit file if it is string URL — only re-upload");
        //     setNewVideoLink(null);
        // } else {
        // }
        setEditIndex(index);
        setisNewFeild(true)
        setisEdit(true)
    }

    // handle Update Video Lecture
    function handleUpdateVideoLecture() {
        const updatedVideoLecture = {
            videoLectureName: newVideoName,
            videoLectureLink: newVideoLink,
        };
        if (editIndex !== null) {
            const updatedVideo = [...formik.values[keyName]];
            updatedVideo[editIndex] = updatedVideoLecture;
            formik.setFieldValue(keyName, updatedVideo);
            setEditIndex(null);
        }
        setisNewFeild(false)
        setisEdit(false)
        // Clear input after adding
        setNewVideoName("");
        setNewVideoLink("");
    }

    // handle Delete Video Lecture
    function handleDeleteVideoLecture() {
        const updatedVideo = formik.values[keyName].filter(
            (_, i) => i !== deleteIndex
        );
        formik.setFieldValue(keyName, updatedVideo);
        setDeleteIndex(null);
        onClose()
    }

    return {
        isNewFeild,
        setisNewFeild,
        isEdit,
        setisEdit,
        fileInputRef,
        isOpen,
        onOpen,
        onOpenChange,
        handleAddNewField,
        handleAddVideoLecture,
        handleOnChangeVideoLectureName,
        handleOnChangeVideoLectureFile,
        newVideoName,
        newVideoLink,
        handleEditVideoLecture,
        handleUpdateVideoLecture,
        handleDeleteVideoLecture,
        setDeleteIndex
    }
}
