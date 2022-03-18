import api from "../../api/Item";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Edit.css";

const EditAbout = () => {
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  // getting the specific id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/about/${path}`);
        setAbout(res.data.about);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [path]);

  const updateAbout = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/about/update/${path}`, {
        about: about,
      });
      setMessage(res.data.msg);
      setAbout("");
      setTimeout(() => {
        history("/admin");
      }, 2000);
    } catch (error) {}
  };

  //
  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={updateAbout}>
              <h3 className="updated"> {message} </h3>
              <label htmlFor="text">About</label>
              <textarea
                id="textarea"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                type="text"
                name="textarea"
                cols="30"
                rows="15"
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

export default EditAbout;
