import { forwardRef } from "react";
import CertificateLayout from "./CertificateLayout";

interface Props {
    name: string;
    date: string;
    course: string;
}

const CertificatePrint = forwardRef<HTMLDivElement, Props>(
    ({ name, date, course }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    position: "absolute",
                    top: "-9999px",
                    left: "-9999px",
                }}
            >
                <CertificateLayout name={name} date={date} course={course} />
            </div>
        );
    }
);

export default CertificatePrint;