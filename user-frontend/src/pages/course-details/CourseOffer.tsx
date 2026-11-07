import BulbOutlineIcon from "@/svg/BulbOutlineIcon";
import CertificateOutlineIcon from "@/svg/CertificateOutlineIcon";
import CollaboratorOutlineIcon from "@/svg/CollaboratorOutlineIcon";
import EBookOutlineIcon from "@/svg/EBookOutlineIcon";

export default function CourseOffer() {
    return (
        <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10">
            <div className="font-semibold text-lg mb-6">What can LeadsGuru Courses offer?</div>
            <div className="flex justify-between gap-4">
                <div className="flex items-start gap-4 max-w-[40%]">
                    <EBookOutlineIcon />
                    <div className="flex flex-col w-[calc(100%-80px)]">
                        <h4 className="font-semibold text-[16px]">Learn at Your Own Pace</h4>
                        <p className="text-[14px]">Embark on a personalized learning journey with our self-paced courses.
                            Tailor your education to fit your schedule, accessing engaging content
                            whenever and wherever suits you
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4 max-w-[40%]">
                    <CollaboratorOutlineIcon />
                    <div className="flex flex-col w-[calc(100%-80px)]">
                        <h4 className="font-semibold text-[16px]">Learn from Experienced mentors</h4>
                        <p className="text-[14px]">Gain invaluable insights from seasoned mentors. Accelerate your learning
                            with expert guidance, benefiting from real-world experience and
                            personalized support.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-4 mt-6">
                <div className="flex items-start gap-4 max-w-[40%]">
                    <BulbOutlineIcon />
                    <div className="flex flex-col w-[calc(100%-80px)]">
                        <h4 className="font-semibold text-[16px]">Learn at Your Own Pace</h4>
                        <p className="text-[14px]">Embark on a personalized learning journey with our self-paced courses.
                            Tailor your education to fit your schedule, accessing engaging content
                            whenever and wherever suits you
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4 max-w-[40%]">
                    <CertificateOutlineIcon />
                    <div className="flex flex-col w-[calc(100%-60px)]">
                        <h4 className="font-semibold text-[16px]">Learn at Your Own Pace</h4>
                        <p className="text-[14px]">Embark on a personalized learning journey with our self-paced courses.
                            Tailor your education to fit your schedule, accessing engaging content
                            whenever and wherever suits you
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
