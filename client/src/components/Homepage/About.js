import React, { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
import "./About.css";

const About = () => {
  const state = useContext(AppContext);
  const [about] = state.about;

  return (
    <div className="main-container">
      <div className="about">
        <h2 className="title">About</h2>

        {about?.map((item) => (
          <div key={item._id} className="about-info">
            <p>{item.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
