import React, { useContext } from "react";
//import image from "../../images/workspace.jpg";
import { AppContext } from "../context/GlobalContext";
import "./Projects.css";

const Projects = () => {
  const state = useContext(AppContext);
  const [project] = state.projects;
  return (
    <div className="main-container">
      <div className="projects">
        <h2 className="title">Projects</h2>
        <div className="projects-center">
          {project.map((item) => (
            <div key={item._id} className="single-project">
              <div className="single-project-img">
                <img src={item.images.url} alt="Imag" />
              </div>

              <div className="single-project-info">
                <h3> {item.title} </h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
