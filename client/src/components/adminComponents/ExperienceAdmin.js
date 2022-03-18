import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../api/Item";

const ExperienceAdmin = () => {
  const [experience, setExperience] = useState("");
  const [experienceData, setExperienceData] = useState([]);
  const [message, setMessage] = useState("");
  // const [messageCond, setMessageCond] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const res = await api.get("/experience");
        if (!isCancelled) {
          setExperienceData(res.data);
        }
      } catch (error) {}
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [experienceData]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setExperience("");
    api
      .post(`/experience`, {
        experience,
      })
      .then((res) => {
        console.log(res);
        setExperienceData([...experienceData, experience]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    await api
      .delete(`/experience/${id}`)
      .then((res) => {
        setMessage(`${res.data.msg}`);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((err) => console.log(err));
    const filteredData = experienceData.filter((Item) => Item._id !== id);
    setExperienceData(filteredData);
  };

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={onSubmitHandler}>
          <h4> Experience Component </h4>
          <label htmlFor="text">Experience</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      <div className="same-item">
        <h3 id="itemdel" className="item-delete-tab">
          <span>{message} </span>
        </h3>

        {experienceData.map((Item, index) => (
          <div key={Item._id || index} className="about-info">
            <div className="same-admin">
              <Link to={`/editexperience/${Item._id}`}>
                <i className="fas fa-edit"></i>
              </Link>
              <i
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(Item._id);
                }}
                className="fas fa-trash"
              ></i>
            </div>

            <div className="single-experience">
              <p>{Item.experience}</p>
            </div>

            {/* <h3 className="item-delete-tab"> Deleted </h3> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdmin;
