import api from "../../api/Item";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Edit.css";

const EditEducation = () => {
  const [education, setEducation] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  // getting the specific id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/education/${path}`);
        setEducation(res.data.education);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [path]);

  const updateAbout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/education/update/${path}`, {
        education,
      });
      setMessage(res.data.msg);
      setEducation("");
      setTimeout(() => {
        history("/admin");
      }, 2000);
    } catch (error) {}
  };

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateAbout}>
              <h3 className="updated"> {message} </h3>
              <h4> Education Component </h4>
              <label htmlFor="text">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
              <div className="btns">
                <button className="updateBtn" type="submit">
                  Update Item
                </button>
                <Link to="/admin">
                  <button className="cancel-btn">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEducation;
