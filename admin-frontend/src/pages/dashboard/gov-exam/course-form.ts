import type { CreateCourseFormValues } from "./gov-exam.types";
import type { DateValue } from "@react-types/calendar";

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
    subject: ""
}