import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/GlobalContext";
import AboutAdmin from "./AboutAdmin";
import "./admin.css";
import EducationAdmin from "./EducationAdmin";
import ExperienceAdmin from "./ExperienceAdmin";
import ProjectsAdmin from "./ProjectsAdmin";

const Admin = () => {
  const state = useContext(AppContext);

  const [isLogin] = state.isLogin;

  return (
    <div className="main-container">
      <h2 className="title">Admin forms</h2>
      {isLogin ? (
        <div className="admin-center">
          {/* about component */}
          <h4 className="admin-title"> About Component </h4>
          <AboutAdmin />

          <br />
          <br />
          <hr style={{ border: "1px solid lightgray" }} />
          <br />
          <h4 className="admin-title">Education Component</h4>

          <EducationAdmin />
          <br />
          <br />
          <hr style={{ border: "1px solid lightgray" }} />
          <br />

          <h4 className="admin-title">Projects Component </h4>
          <ProjectsAdmin />
          <br />
          <br />
          <hr style={{ border: "1px solid lightgray" }} />
          <br />

          <h4 className="admin-title">Experience Component </h4>
          <ExperienceAdmin />
          <br />
        </div>
      ) : (
        <div> Only Admin can acces </div>
      )}
    </div>
  );
};

export default Admin;
