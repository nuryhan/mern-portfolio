import React, { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import "./Experience.css";

const Experience = () => {
  const state = useContext(AppContext);
  const [experience] = state.experience;

  return (
    <div className="main-container">
      <h2 className="title">Experience</h2>

      <div className="experience">
        <div className="experience-center">
          {experience?.map((item, index) => (
            <div key={item._id || index} className="single-experience">
              <p>{item.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
