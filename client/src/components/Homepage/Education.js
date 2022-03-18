import React, { useContext } from "react";
import "./Education.css";
import { AppContext } from "../context/GlobalContext";

const Education = () => {
  const state = useContext(AppContext);
  const [education] = state.education;

  return (
    <div className="main-container">
      <div className="education">
        <h2 className="title">Education </h2>

        <div className="education-center">
          {education?.map((item) => (
            <div key={item._id} className="single-education">
              <p> {item.education} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
