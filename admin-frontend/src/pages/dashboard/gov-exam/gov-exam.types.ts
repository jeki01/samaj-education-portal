import type { DateValue } from "@react-types/calendar";
export const GOV_STEPPER: GOV_STEPPERT = {
    CREATE: 0,
    STEP_ONE: 1,
    STEP_TWO: 2,
    STEP_THREE: 3,
    STEP_FOUR: 4,
    STEP_FIVE: 5
}

type GOV_PG_NUM = 0 | 1 | 2 | 3 | 4 | 5;

export type GOV_STEPPERT = {
    CREATE: GOV_PG_NUM,
    STEP_ONE: GOV_PG_NUM,
    STEP_TWO: GOV_PG_NUM,
    STEP_THREE: GOV_PG_NUM,
    STEP_FOUR: GOV_PG_NUM,
    STEP_FIVE: GOV_PG_NUM
}

// ================= create course form with steps ==================

interface StudyNotesI { //step 2
    studyNoteName: string,
    studyNoteFile: string | File | null
}

interface VideoLecturesI { //step 3
    videoLectureName: string,
    videoLectureLink: string
}

// step 4
export interface TestTopicQuestionI {
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    answer: string,
}

interface TestSeriesI {
    topicName: string,
    topicQuestions: TestTopicQuestionI[]
}

export interface CreateCourseFormValues {
    category: string,
    subcategory: string,
    subsubcategory: string,
    courseName: string,
    courseImages: string | File,
    courseValidity: string,
    expireDate?: DateValue | null,
    coursePrice: string,
    courseDescription: string, //create course first page
    _id: string,
    ebook: string | File, // step 1
    studyNotes: StudyNotesI[], // step 2
    videoLectures: VideoLecturesI[], //step 3
    testSeries: TestSeriesI[] //step 4
    categoryType: "Topic" | "Subject" | "Syllabus",
    subject: string
}