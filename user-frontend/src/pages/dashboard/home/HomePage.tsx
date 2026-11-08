import SearchBar from "@/ui/search/SearchBar";
import "./home-page.css";
import CourseList from "./components/course-list/CourseList";
import HomeThemeProvider from "./hook/HomeThemeProvider";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <HomeThemeProvider>
      <div className="p-4">
        <SearchBar />

        {/* Greeting */}
        <div className="home-greeting">
          <p className="home-greeting-hi">नमस्ते! 🙏</p>
          <h1 className="home-greeting-title">
            <span>पंचाल समाज</span> की प्रगति,<br />आपकी सफलता!
          </h1>
        </div>

        {/* Featured Banner Card */}
        <div className="home-banner-card">
          <div className="home-banner-text">
            <p className="home-banner-eyebrow">पंचाल प्रगति — समाज के साथ, आगे बढ़ो</p>
            <h2 className="home-banner-title">
              Compete, Win &<br />Make Samaj Proud
            </h2>
            <button className="home-banner-cta" type="button" onClick={() => navigate("/competitions")}>
              🏆 Competition →
            </button>
          </div>
          <div className="home-banner-deco" aria-hidden="true">
            <div className="home-banner-ring home-banner-ring--1" />
            <div className="home-banner-ring home-banner-ring--2" />
            <div className="home-banner-ring home-banner-ring--3" />
          </div>
        </div>

        <CourseList />
      </div>
    </HomeThemeProvider>
  );
}
