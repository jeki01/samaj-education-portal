import SearchBar from "@/ui/search/SearchBar";
import CompetitionContent from "./components/CompetitionContent";
import "./competition.css";

export default function CompetitionPage() {
  return (
    <>
      <div className="p-4">
        <SearchBar />
        <CompetitionContent />
      </div>
    </>
  )
}
