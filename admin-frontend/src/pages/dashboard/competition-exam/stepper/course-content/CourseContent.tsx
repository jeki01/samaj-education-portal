
import CancelBlackIcon from "@/svg/CancelBlackIcon"
import { useParams } from "react-router"
import UseCourseDetails from "./useCourseDetails"
// import CalenderIcon from "@/svg/CalenderIcon"
// import CourseContentSection from "./CourseContentSection"
// import type { FormikProps } from "formik"
// import DOMPurify from 'dompurify';

export default function CourseContent({ handleCancelCourse, EditCourse, publishedCourseApi }: CourseContentProp) {
  const { slug } = useParams();
  const {
    formik,
    // handleInputChange,
    // preventInvalidKey,
    // percentageError,
    // isEditable,
    // setIsEditable
  } = UseCourseDetails();
  return (
    <>
      <div className="create-course-base">
        {/* Nav */}
        <div className="create-course-head">
          <div></div>
          <button onClick={handleCancelCourse} className="create-course-cancel-btn"><CancelBlackIcon /></button>
        </div>
        {/* Stepper Head */}
        <div className="stepper-head">
          <div className="stepper-title !mb-1">Course Content</div>
        </div>

        {/*  */}
        <div className="max-w-[962px] mx-auto mb-8">
          <div className="text-[#888888]">Exam Name : <span className="text-[#9533FB] font-bold"> {formik?.values?.examName || "-"}</span></div>
          <div className="text-[#888888]">Schedule Date : <span className="text-[#9533FB] font-bold"> {formik?.values?.scheduleDate?.toString() || "-"}</span></div>
          <div className="text-[#888888]">Schedule Time : <span className="text-[#9533FB] font-bold"> {formik?.values?.scheduleTime?.toString() || "-"}</span></div>
          <div className="text-[#888888]">Total Exam Time : <span className="text-[#9533FB] font-bold"> {formik?.values?.totalExamTime || "-"} min</span></div>
          <div className="text-[#888888]">Each question marks : <span className="text-[#9533FB] font-bold"> {formik?.values?.marksPerQuestion || "-"}</span></div>
          <div className="text-[#888888]">Negative marking : <span className="text-[#9533FB] font-bold"> {formik?.values?.negativeMarkings || "-"}</span></div>
          <div className="text-[#888888]">Total questions : <span className="text-[#9533FB] font-bold"> {formik?.values?.testSeries[0]?.topicQuestions.length || "-"}</span></div>
          {/* <div className="flex gap-x-4 py-4">

            <div className="w-[314px]">
              {formik?.values?.courseImages &&
                (typeof formik?.values?.courseImages === "string" ? (
                  <img src={import.meta.env.VITE_BASE_URL_MEDIA + "/" + formik?.values?.courseImages} alt="sd" />
                ) : (
                  <img src={URL.createObjectURL(formik?.values?.courseImages)} alt="sd" />
                ))
              }
            </div>
            <div className="flex flex-col w-[calc(100%-314px)]">
              <h4 className="font-semibold text-[20px]">{formik?.values.courseName || "-"}</h4>
              <p
                style={{ overflowWrap: "break-word" }}
                className="text-[#888888] course-content-description"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formik?.values?.courseDescription) }}
              >
              </p>
            </div>

          </div> */}
          <div className="flex items-center gap-x-8">
            {/* <div className="text-[#888888] validity-days-preview flex items-center gap-x-2"><CalenderIcon /> Validity {formik?.values?.courseValidity} days</div> */}
            <div className="text-[#888888]">Exam Price : <span className="text-[#9533FB] font-bold"> ₹ {formik?.values?.examPrice} /- INR</span></div>
          </div>

          {/* <TypeSections courseType={CourseType} formik={formik} /> */}
          {/* <CourseContentSection
            ebook={formik.values?.ebook ? 1 : 0}
            studyNotes={formik.values?.studyNotes ? 1 : 0}
            videoLecture={formik.values.videoLectures.length}
            testSeries={formik.values.testSeries.length}
            categoryType={formik.values.categoryType}
            formik={formik}
            handleInputChange={handleInputChange}
            preventInvalidKey={preventInvalidKey}
            percentageError={percentageError}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          /> */}

          <div className="flex justify-center gap-x-4">
            <button type="button"
              className={`text-lg text-primary border-2 border-primary font-bold w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}
              onClick={EditCourse}
            >Edit Course</button>
            <button
              // disabled={!!percentageError}
              type="submit"
              className={` bg-[linear-gradient(90deg,#6633CC,#9933FF)] text-lg disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-medium w-full max-w-[250px] rounded-[10px] h-[54px] mt-4 `}
              onClick={async () => {
                if (slug) {
                  await formik.submitForm()
                  publishedCourseApi(slug)
                }
              }}
            >Publish</button>
          </div>
        </div>

      </div>
    </>
  )
}


// function TypeSections({ courseType, formik }: { courseType: number, formik: FormikProps<CourseDetailsI> }) {
//   switch (courseType) {
//     case 1:
//       return <CourseContentSection
//         ebook={getCountByType("Syllabus", formik.values.ebook)}
//         studyNotes={getCountByType("Syllabus", formik.values.studyNotes)}
//         videoLecture={getCountByType("Syllabus", formik.values.videoLectures)}
//         testSeries={getCountByType("Syllabus", formik.values.testSeries)}
//       />
//     case 2:
//       return <CourseContentSection
//         ebook={getCountByType("Subject", formik.values.ebook)}
//         studyNotes={getCountByType("Subject", formik.values.studyNotes)}
//         videoLecture={getCountByType("Subject", formik.values.videoLectures)}
//         testSeries={getCountByType("Subject", formik.values.testSeries)}
//       />
//     case 3:
//       return <CourseContentSection
//         ebook={getCountByType("Topic", formik.values.ebook)}
//         studyNotes={getCountByType("Topic", formik.values.studyNotes)}
//         videoLecture={getCountByType("Topic", formik.values.videoLectures)}
//         testSeries={getCountByType("Topic", formik.values.testSeries)}
//       />
//     default:
//       return <></>
//   }
// }

interface CourseContentProp {
  handleCancelCourse?: () => void,
  EditCourse: () => void,
  publishedCourseApi: (i: string) => void
}

// function getCountByType(type: string, arr: { [key: string]: unknown }[]) {
//   const count = arr.filter((obj) => obj.categoryType === type)[0]?.count;
//   return Number(count) || 0;
// }