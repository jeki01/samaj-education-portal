import CompleteProfile from "@/pages/complete-profile/CompleteProfile";
import CourseTest from "@/pages/dashboard/course-test-page/CourseTest";
import HomePage from "@/pages/dashboard/home/HomePage";
import Layout from "@/pages/dashboard/Layout";
import MyLearnCourseDetails from "@/pages/dashboard/my-learning-course/MyLearnCourseDetails";
import MyLearning from "@/pages/dashboard/my-learning/MyLearning";
import Profile from "@/pages/dashboard/profile/Profile";
import WishlistPage from "@/pages/dashboard/wishlist/WishlistPage";
import SelectFieldPage from "@/pages/field/SelectFieldPage";
import ForgetOTP from "@/pages/forget-password/ForgetOTP";
import ForgetPassword from "@/pages/forget-password/ForgetPassword";
import Login from "@/pages/login/Login";
import OTP from "@/pages/otp/OTP";
import SelectExam from "@/pages/select-exam/SelectExam";
import SignUp from "@/pages/signup/SignUp";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
// import TestInstruction from "@/pages/dashboard/course-test-page/components/instruction/TestInstruction";
import { useAccount } from "@/context/account/AccountContext";
import SkillCertificates from "@/features/user/skills-prep/certificates/SkillCertificates";
import SkillOverview from "@/features/user/skills-prep/overview/SkillOverview";
import Plans from "@/features/user/skills-prep/plans/Plans";
import ReferralsIndex from "@/features/user/skills-prep/referrals/ReferralsIndex";
import BundleDetails from "@/pages/bundle/BundleDetails";
import Chat from "@/pages/competitions/chat/Chat";
import CompetitionPage from "@/pages/competitions/CompetitionPage";
import CourseDetails from "@/pages/course-details/CourseDetails";
import CheckResult from "@/pages/dashboard/check-result/CheckResult";
import Complimentary from "@/pages/dashboard/complimentary/Complimentary";
import TestResult from "@/pages/dashboard/course-test-page/learn-test-components/result/TestResult";
import ComplimentaryCourseDetails from "@/pages/dashboard/my-complimentary-course/ComplimentaryCourseDetails";
import PaymentRedirection from "@/pages/dashboard/payment-redirection/PaymentRedirection";
import OnboardLayout from "@/pages/onboarding/OnboardLayout";
import PricingPlans from "@/pages/pricing-plans/PricingPlans";
import PrivacyPolicy from "@/pages/privacy-policy/PrivacyPolicy";
import TermCondition from "@/pages/term-condition/TermCondition";

export default function Index() {
    const { accountMode } = useAccount();
    console.log("2march-user:4:30pm");

    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
                <Route element={<OnboardLayout />}>
                    <Route index element={<SelectFieldPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/forget-password/:id" element={<ForgetOTP />} />
                    <Route path="/signup/:slug" element={<SignUp />} />
                    <Route path="/otp" element={<OTP />} />
                    <Route path="/complete-profile/:id" element={<CompleteProfile />} />
                    <Route path="/select-exam/:id" element={<SelectExam />} />
                </Route>
            </Route>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-learning" element={<MyLearning />} />
                    <Route path="/my-learning/:courseId" element={<MyLearnCourseDetails />} />

                    {
                        accountMode === "exam" ? <>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/complimentary" element={<Complimentary />} />
                            <Route path="/complimentary/:courseId" element={<ComplimentaryCourseDetails />} />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route path="/competitions" element={<CompetitionPage />} />
                            <Route path="/competitions/chat/:testId" element={<Chat />} />
                        </>
                            : <>
                                <Route path="/explore-bundle" element={<Plans />} />
                                <Route path="/certificates" element={<SkillCertificates />} />
                                <Route path="/overview" element={<SkillOverview />} />
                                <Route path="/referrals" element={<ReferralsIndex />} />
                            </>
                    }

                </Route>
                <Route element={<OnboardLayout />}>
                    <Route path="/pricing-plans/:id" element={<PricingPlans />} />
                </Route>

                {/* <Route path="/my-learning/:courseId/:topicId" element={<TestInstruction />} /> */}
                <Route path="/my-learning-test/:courseId/:topicId" element={<CourseTest />} />
                <Route path="/my-learning-result/:courseId/:topicId/:attemptId" element={<TestResult />} />
                <Route path="/payment-redirect/:orderId" element={<PaymentRedirection />} />
                <Route path="/competition-payment-redirect/:orderId" element={<PaymentRedirection />} />
                <Route path="/check-result/:attemptId/:courseId/:testSeriesId" element={<CheckResult />} />
                <Route element={<OnboardLayout />}>
                    <Route path="/bundle/:id" element={<BundleDetails />} />
                    <Route path="/course/:id" element={<CourseDetails />} />
                </Route>
            </Route>
            <Route element={<OnboardLayout />}>
                <Route path="/terms-and-conditions" element={<TermCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
            <Route path="*" element={"404 Page not found"} />
        </Routes>
    )
}
