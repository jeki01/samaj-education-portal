import { Accordion, AccordionItem } from "@heroui/react";
export default function FAQSection() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <div className="bg-[#F8F1FF]">
            <div className="2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[780px] max-w-full mx-auto py-10 ">
                <div className="font-semibold text-lg mb-6">Frequently Asked Questions</div>
                <Accordion showDivider={false}>
                    {
                        Array(10).fill("").map((_, i) => (
                            <AccordionItem key={`faq-${i + 1}`} aria-label={`Accordion ${i + 1}`} title="What is LeadsGuru?" classNames={{ base: "mb-3", trigger: "bg-white py-3 px-4 rounded-[10px]", title: "text-[14px]" }}>
                                {defaultContent}
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </div>
    )
}
