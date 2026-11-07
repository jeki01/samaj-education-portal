import TestClockIcon from '@/svg/TestClockIcon';
import TestHead from '../head/TestHead'
import "./test-instruction.css";
import { Link, useParams, useSearchParams } from 'react-router';
import UsePurchasedCourseDetails from '@/pages/dashboard/my-learning-course/hook/usePurchasedCourseDetails';
// import TestInstructionBG from '@/svg/TestInstructionBG';

export default function TestInstruction() {
    const { purchasedCourseDetails } = UsePurchasedCourseDetails();
    const slug = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    return (
        <>
            {/* <img src="/instruction-banner.svg" alt="test-banner" /> */}
            {/* Head */}
            <TestHead />
            {/* Body */}
            <div className="instruction-body h-[417px] mb-12 mt-20 flex justify-between items-center pl-12">
                {/* <img src="/instruction-bg.svg" alt="sadf" className='bg' /> */}
                {/* <TestInstructionBG /> */}
                <div className="md:w-[741px] p-8">
                    <div className="flex items-center gap-x-4">
                        <div className="clock-icon">
                            <TestClockIcon />
                        </div>
                        <div className="clock-icon-text text-[#32324D] font-bold text-[24px]">Test Time: {purchasedCourseDetails?.testTime || 0} minutes</div>
                    </div>
                    <div className="h-[1px] bg-[#D5D7D9] w-full my-4 intruction-divider"></div>
                    <div className="text-[20px] text-[#202020] font-semibold intruction-title">Before starting test please read the instructions carefully:</div>
                    <ol className="text-[#666687] text-[20px] list-decimal pl-4">
                        <li>You must have a stable internet connection.</li>
                        <li>Test time duration will be {purchasedCourseDetails?.testTime || 0} minutes.</li>
                        <li>Camera should be active.</li>
                        <li>Once the test starts, you will not be allowed to switch tabs. If we find the above activity, the test will end immediately, saving the questions you completed until then.</li>
                    </ol>
                </div>
                <img src="/instruction-banner.svg" alt="image" />
            </div>
            {/* Bottom */}
            <div className="w-full flex justify-center items-center instruction-bottom-bar">
                <Link to={type === "complimentary" ? `/my-learning-test/${purchasedCourseDetails?._id}/${slug?.topicId}?type=complimentary` : `/my-learning-test/${purchasedCourseDetails?._id}/${slug?.topicId}`} className="common-btn-ui text-white py-[16px] px-[24px] text-[16px] max-w-[200px] h-[54px] rounded-[16px]">Next</Link>
            </div>
        </>
    )
}
