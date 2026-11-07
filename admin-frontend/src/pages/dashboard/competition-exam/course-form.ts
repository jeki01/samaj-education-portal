import type { CreateCourseFormValues, TestSeriesI } from "./gov-exam.types";
import type { DateValue } from "@react-types/calendar";
import { Time } from "@internationalized/date";
export const initialValuesCourseForm: CreateCourseFormValues = {
    category: "",
    subcategory: "",
    subsubcategory: "",
    courseName: "",
    courseImages: "",
    courseValidity: "",
    expireDate: null as DateValue | null, // store DateValue not JS Dat
    coursePrice: "",
    courseDescription: "",
    _id: "",
    ebook: "",
    studyNotes: [],
    videoLectures: [],
    testSeries: [],
    categoryType: "Syllabus",
    subject: "",
    maximumMark: 1,
    negativeMark: 0,
    testTime: 1,
    examTime: ""
}

export interface createExamI {
    examName: string;
    examPrice: string;
    totalExamTime: string;
    marksPerQuestion: string;
    negativeMarkings: number;
    scheduleDate: DateValue | null;
    scheduleTime: Time | null;
    testSeries: TestSeriesI[]
}