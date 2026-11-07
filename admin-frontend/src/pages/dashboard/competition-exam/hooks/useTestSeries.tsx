import { useDisclosure } from "@heroui/react";
import type { FormikProps } from "formik";
import { useEffect, useState, type ChangeEvent } from "react";
import type { TestSeriesFormVal } from "../stepper/step-4/useTestSeriesStep";
import type { ErrResp } from "@/config/axios-instance";
import { toast } from "react-toastify";
import { checkAuthUserHelper } from "@/helper/global.helper";
import { handleCompetitionExamById } from "@/services/gov-exam.service";
import { useParams } from "react-router";

// export type 

export type QuestionForm = {
    question: string;
    questionImage?: string;
    option1: string;
    option1Image?: string;
    option2: string;
    option2Image?: string;
    option3: string;
    option3Image?: string;
    option4: string;
    option4Image?: string;
    option5: string;
    option5Image?: string;
    answer: string;
};

const initialFormData: QuestionForm = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    option5: "",
    answer: "",
    questionImage: "",
    option1Image: "",
    option2Image: "",
    option3Image: "",
    option4Image: "",
    option5Image: ""
};

export default function UseTestSeries(formik: FormikProps<TestSeriesFormVal>, keyName: keyof TestSeriesFormVal) {
    const [isNewFeild, setisNewFeild] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen: isOpenAddNew, onOpen: onOpenAddNew, onOpenChange: onOpenChangeAddNew, onClose: onCloseAddNew } = useDisclosure();
    const { isOpen: isOpenQue, onOpenChange: onOpenChangeQue, onOpen: onOpenQue, onClose: onCloseQueModal } = useDisclosure();

    const [newTopicName, setNewTopicName] = useState("");
    // const [newVideoLink, setNewVideoLink] = useState<string>("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [questionData, setQuestionData] = useState(initialFormData);
    const [questionList, setQuestionList] = useState<QuestionForm[]>([]);
    const [editQueIndex, setEditQueIndex] = useState<number | null>(null);
    // const [deleteIndexQue, setDeleteIndexQue] = useState<number | null>(null);
    const [isEditQue, setisEditQue] = useState(false);
    const { slug } = useParams();

    // handle cancel edit modal
    function handleCancelTopicAndQueModal() {
        setQuestionList([])
        setNewTopicName("")
        setisEdit(false)
        onCloseAddNew()
    }

    // handle change question and answer
    const handleChangeQueAns = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files?.[0] || null;
            setQuestionData((prev) => ({
                ...prev,
                [name]: file, // store the File instead of just name
            }));
        } else {
            setQuestionData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // setQuestionData((prev) => ({
        //     ...prev,
        //     [name]: value,
        // }));
    };

    // handle Add Questions Modal
    function handleAddTopicQuestions() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { option5, ...rest } = questionData;
        // TODO: Validation
        // const isEmpty = Object.values(rest).some((value) => value.trim() === "");
        // if (isEmpty) {
        //     alert("Please fill all the fields.");
        //     return;
        // }

        // Add to question list
        setQuestionList((prev) => [...prev, questionData]);

        // Reset form
        setQuestionData(initialFormData);
        // setErrors("");
        onCloseQueModal()
    }

    // handle Edit Questions Modal
    function handleEditTopicQuestions(index: number) {
        const queData = questionList[index];
        setEditQueIndex(index);
        setQuestionData(queData)
        setisEditQue(true);
        onOpenQue()
    }
    // handle Update Questions Modal
    function handleUpdateTopicQuestions() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const { option5, option5Image, ...rest } = questionData;
        // const isEmpty = Object.values(rest).some((value) => value.trim() === "");
        // if (isEmpty) {
        //     alert("Please fill all the fields.");
        //     return;
        // }
        if (editQueIndex !== null) {
            setQuestionList((prev) =>
                prev.map((q, idx) => (idx === editQueIndex ? questionData : q))
            );
            setEditQueIndex(null)
            setisEditQue(false)
            // Reset form
            setQuestionData(initialFormData);
            onCloseQueModal()
        }
    }
    // handle Delete Questions Modal
    function handleDeleteTopicQuestions(index: number) {
        const newList = questionList.filter((_, idx) => idx !== index);
        setQuestionList(newList);
    }

    // handle OnChange Test Seriesname
    function handleOnChangeTestSeriesName(e: ChangeEvent<HTMLInputElement>) {
        setNewTopicName(e.target.value)
    }

    // handle OnChange Test Series Link
    // function handleOnChangeVideoLectureFile(e: ChangeEvent<HTMLInputElement>) {
    //     setNewVideoLink(e.target.value)
    // }

    // handle Add new Test Series
    const handleAddTestSeries = () => {
        // if(!newTopicName){
        //     return alert("Test name is required!")
        // }
        if (questionList.length === 0) {
            return alert("Question list is required!")
        }
        // if (newTopicName) {
        // }
        // const newTopicLecture = {
        //     topicName: newTopicName || "test-name",
        //     topicQuestions: questionList,
        // };

        formik.setFieldValue(keyName, [
            {
                topicName: newTopicName || "test-name",
                topicQuestions: questionList,
                // topicQuestions: [...(formik.values["topics"][0]?.topicQuestions || []), ...questionList],
            }
        ]);

        // formik.setFieldValue(keyName, [
        //     ...(formik.values["topics"] || []),
        //     newTopicLecture,
        // ]);

        // Clear input after adding
        // setNewTopicName("");
        // setQuestionList([]);
        // close field
        onCloseAddNew()
        // setisNewFeild(false);
    };

    useEffect(() => {
        // auto update when new ques added
        if (questionList.length > 0)
            handleAddTestSeries()
    }, [questionList])


    // Add New Feild
    function handleAddNewField() {
        setisNewFeild(true)
    }

    // handle Edit Test Series Lecture
    // function handleEditTestSeries(index: number = 0) {
    //     const video = formik.values[keyName][index];
    //     setNewTopicName(video.topicName);
    //     setQuestionList(video.topicQuestions);
    //     // setNewVideoLink(video.videoLectureLink);
    //     // if (typeof note.studyVideoLectureFile === "string") {
    //     //     alert("Cannot edit file if it is string URL — only re-upload");
    //     //     setNewVideoLink(null);
    //     // } else {
    //     // }
    //     setEditIndex(index);
    //     setisNewFeild(true)
    //     setisEdit(true)
    // }


    async function getStudyNotes(id: string) {
        try {
            const resp = await handleCompetitionExamById(id);
            const data = resp?.data?.data?.testSeries;
            const testSeries = data[0];
            // setNewTopicName(testSeries?.topicName || "test");
            if (testSeries) {
                setQuestionList(testSeries.topicQuestions);
            }
            // setNewVideoLink(video.videoLectureLink);
            // if (typeof note.studyVideoLectureFile === "string") {
            //     alert("Cannot edit file if it is string URL — only re-upload");
            //     setNewVideoLink(null);
            // } else {
            // }
            setEditIndex(0);
            setisNewFeild(true)
            setisEdit(true)
            // if (resp?.data?.data?.maximumMark) formik.setFieldValue("maximumMark", resp?.data?.data?.maximumMark);
            // if (resp?.data?.data?.negativeMark) formik.setFieldValue("negativeMark", resp?.data?.data?.negativeMark);
            // formik.setFieldValue("topics", data);
            // formik.setFieldValue("categoryType", resp?.data?.data?.categoryType)
            // if (resp?.data?.data?.testTime) formik.setFieldValue("testTime", resp?.data?.data?.testTime);
            // convertApiDataToUserData(data);
        } catch (error) {
            console.log(error);
            const err = error as ErrResp;
            toast.error(err?.response?.data?.message);
            checkAuthUserHelper(err)
        }
    }

    useEffect(() => {
        if (slug && slug !== "create-course")
            getStudyNotes(slug)
    }, [slug])


    // handle Update Test Series Lecture
    function handleUpdateTestSeries() {
        const updatedTestSeries = {
            topicName: newTopicName,
            topicQuestions: questionList,
        };
        if (editIndex !== null) {
            const updatedVideo = [...formik.values[keyName]];
            updatedVideo[editIndex] = updatedTestSeries;
            formik.setFieldValue(keyName, updatedVideo);
            setEditIndex(null);
        }
        setisNewFeild(false)
        setisEdit(false)
        // Clear input after adding
        setNewTopicName("");
        setQuestionList([])
        onCloseAddNew();
    }

    // handle Delete Test Series
    function handleDeleteTestSeries() {
        const updatedVideo = formik.values[keyName].filter(
            (_, i) => i !== deleteIndex
        );
        formik.setFieldValue(keyName, updatedVideo);
        setDeleteIndex(null);
        onClose()
    }

    // Bulk uploaded data 
    function handleBulkUploadedData(data: QuestionForm[]) {
        const myData = data;
        setQuestionList((prev: QuestionForm[]) => [...prev, ...myData]);
    }

    // On cancel update process at AddQuesModal
    function handleOnCancelAddQuesModal() {
        // Reset form
        setEditQueIndex(null)
        setisEditQue(false)
        setQuestionData(initialFormData);
        onCloseQueModal()
    }

    return {
        isNewFeild,
        setisNewFeild,
        isEdit,
        setisEdit,
        isOpen,
        onOpen,
        onOpenChange,
        handleAddNewField,
        handleAddTestSeries,
        handleOnChangeTestSeriesName,
        newTopicName,
        // handleEditTestSeries,
        handleUpdateTestSeries,
        handleDeleteTestSeries,
        setDeleteIndex,
        onOpenChangeAddNew,
        onOpenAddNew,
        isOpenAddNew,
        handleChangeQueAns,
        questionData,
        handleAddTopicQuestions,
        isOpenQue,
        onOpenChangeQue,
        onOpenQue,
        questionList,
        handleEditTopicQuestions,
        handleUpdateTopicQuestions,
        isEditQue,
        handleDeleteTopicQuestions,
        handleCancelTopicAndQueModal,
        handleBulkUploadedData,
        handleOnCancelAddQuesModal
    }
}