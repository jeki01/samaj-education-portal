import SearchBar from "@/ui/search/SearchBar";
import "./complimentary.css";
import ComplimentaryCourses from "./components/purchased-courses/ComplimentaryCourses";

export default function Complimentary() {
    return (
        <>
            <div className="p-4">
                <SearchBar />
                <ComplimentaryCourses />
            </div>
        </>
    )
}
