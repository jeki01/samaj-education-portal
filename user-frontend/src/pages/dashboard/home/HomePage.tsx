import SearchBar from "@/ui/search/SearchBar";
import "./home-page.css";
import CourseList from "./components/course-list/CourseList";
import HomeThemeProvider from "./hook/HomeThemeProvider";

export default function HomePage() {
  return (
    <HomeThemeProvider>
      <div className="p-4">
        <SearchBar />

        {/* Greeting */}
        <div className="home-greeting">
          <p className="home-greeting-hi">Hello there! 👋</p>
          <h1 className="home-greeting-title">
            Ready to <span>crack</span> your exam?
          </h1>
        </div>

        {/* Featured Banner Card */}
        <div className="home-banner-card">
          <div className="home-banner-text">
            <p className="home-banner-eyebrow">Curated for your success</p>
            <h2 className="home-banner-title">
              Learn Smarter,<br />Score Better
            </h2>
            <button className="home-banner-cta" type="button">
              Explore Courses →
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
