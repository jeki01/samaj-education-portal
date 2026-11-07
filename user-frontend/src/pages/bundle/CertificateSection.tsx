
export default function CertificateSection() {
    return (
        <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10 flex items-start justify-between gap-8">
            <div className="w-[60%] flex flex-col h-full gap-4">
                <div className="font-semibold text-lg mb-2">Earn the Certificate of Completion</div>
                <p className="text-[14px] mb-2">Embark on a learning journey and earn your Certificate of Completion with our comprehensive program. Here's a simple guide to success:</p>
                <ul className="list-disc pl-4 text-[14px]">
                    <li className="mb-2">View Course: Explore our engaging and informative course content designed to enhance your skills and knowledge in your chosen field.</li>
                    <li className="mb-2">Learn: Dive into the rich learning experience. Absorb valuable insights, practical knowledge, and industry best practices presented by experts in the field.</li>
                    <li className="mb-2">Attend Test: Assess your understanding and proficiency by participating in a thoughtfully crafted test. This step ensures you have grasped the key concepts and are ready for the next phase.</li>
                    <li className="mb-2">Get Certificate: Upon successful completion of the course and passing the test, proudly receive your Certificate of Completion. Showcase your newfound expertise and use it to advance your career or professional pursuits..</li>
                </ul>
            </div>
            <div className="w-[30%]">
                <img src="/certificate.png" alt="certificate" />
            </div>
        </div>
    )
}
