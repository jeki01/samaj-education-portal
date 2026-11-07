import CompetitionCourseList from "@/pages/dashboard/competition-exam/competition-course-list/CompetitionCourseList";
import CompetitionExamPage from "@/pages/dashboard/competition-exam/CompetitionExamPage";
import CoursePage from "@/pages/dashboard/courses/CoursePage";
import GovCourseList from "@/pages/dashboard/gov-exam/gov-course-list/GovCourseList";
import GovExamPage from "@/pages/dashboard/gov-exam/GovExamPage";
import Layout from "@/pages/dashboard/Layout";
import SkillBundleIndex from "@/pages/dashboard/skill-bundle/SkillBundleIndex";
import SubjectType from "@/pages/dashboard/subject-type/SubjectType";
import SkillCoursePage from "@/pages/dashboard/subjects/SkillCoursePage";
import SubjectIndex from "@/pages/dashboard/subjects/SubjectIndex";
import UserListPage from "@/pages/dashboard/users/UserListPage";
import OTP from "@/pages/otp/OTP";
import { Route, Routes } from "react-router";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function Index() {
    console.log("friday-27feb-busibee-admin");

    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route index element={<Login />} />
                <Route path="/otp" element={<OTP />} />
            </Route>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/course" element={<CoursePage />} />
                    <Route path="/subject-types" element={<SubjectType />} />
                    <Route path="/gov-exam" element={<GovCourseList />} />
                    <Route path="/gov-exam/:slug" element={<GovExamPage />} />
                    <Route path="/competition-exam" element={<CompetitionCourseList />} />
                    <Route path="/competition-exam/:slug" element={<CompetitionExamPage />} />
                    <Route path="/skill-course" element={<SubjectIndex />} />
                    <Route path="/skill-course/:slug" element={<SkillCoursePage />} />
                    <Route path="/skill-bundle" element={<SkillBundleIndex />} />
                    <Route path="/users" element={<UserListPage />} />
                </Route>
            </Route>
        </Routes>
    )
}
