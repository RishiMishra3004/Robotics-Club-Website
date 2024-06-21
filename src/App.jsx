import { useState } from "react";
import { CustomCard } from "./Components/Card/Card";
import "./index.css";
import { Projects } from "./Components/Card/products";
import Footer from "./Components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar"; // Import the Navbar

const App = () => {
  const [filterTag, setFilterTag] = useState(null);
  const [page, setPage] = useState(1);
  const handleTagClick = (tag) => {
    setFilterTag(tag);
  };

  const filteredProjects = filterTag
    ? Projects.filter((project) => project.tags.actual.includes(filterTag))
    : Projects;
  // console.log(filteredProjects.length);
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= filteredProjects.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div>
      <div className="container mx-auto px-4 bg-gray-700">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.slice(page * 12 - 12, page * 12).map((project) => (
            <CustomCard
              key={project.id}
              image={project.image}
              description={project.description}
              title={project.title}
              tags={project.tags}
              status={project.status}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
        <div>
          {filteredProjects.length > 0 && (
            <div className="flex justify-between mt-2  ">
              <span
                onClick={() => selectPageHandler(page - 1)}
                style={{ cursor: "pointer" }}
              >
                👈
              </span>
              {[...Array(Math.ceil(filteredProjects.length / 12))].map(
                (_, index) => (
                  <span
                    key={index}
                    onClick={() => selectPageHandler(index + 1)}
                    style={{
                      cursor: "pointer",
                      margin: "0 5px",
                      fontWeight: page === index + 1 ? "bold" : "normal",
                    }}
                  >
                    {index + 1}
                  </span>
                )
              )}
              <span
                onClick={() => selectPageHandler(page + 1)}
                style={{ cursor: "pointer" }}
              >
                👉
              </span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
