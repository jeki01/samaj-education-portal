export interface TopicQuestions {
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    option5: string,
    answer: string,
    _id: string,
    clientAnswer?: string;
    questionImage?: string;
    option1Image?: string;
    option2Image?: string;
    option3Image?: string;
    option4Image?: string;
    option5Image?: string;
}

export interface TestSeriesI {
    topicName: string,
    topicQuestions: TopicQuestions[],
    percentage: null | number,
    _id: string
}
export interface PurchasedCoursesI {
    _id: string,
    category: {
        _id: string,
        name: string,
        type: string,
        parent: string,
        createdBy: string,
        createdAt: string,
        updatedAt: string
    },
    subcategory: {
        _id: string,
        name: string,
        type: string,
        parent: string,
        createdBy: string,
        createdAt: string,
        updatedAt: string
    },
    courseImages: string,
    ebook: string,
    studyNotes: string,
    courseName: string,
    courseDescription: string,
    courseValidity: number,
    coursePrice: number,
    categoryType: string,
    videoLectures: {
        videoLectureName: string,
        videoLectureLink: string,
        _id: string
    }[],
    testSeries: TestSeriesI[],
    ebookPrice: number,
    notePrice: number,
    videoPrice: number,
    testPrice: number,
    status: string,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    "maximumMark": number,
    "negativeMark": number,
    "testTime": number,
    "ebookPercentage": number,
    "notePercentage": number,
    "testPercentage": number,
    "videoPercentage": number,
    subject: {
        "_id": string,
        "category": string,
        "subcategory": string,
        "name": string,
        "createdBy": string,
        "createdAt": string,
        "updatedAt": string,
    },
    referName:string,
    overallProgress: number
}