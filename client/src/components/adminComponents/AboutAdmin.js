import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import api from "../../api/Item";

const AboutAdmin = () => {
  const [about, setAbout] = useState("");
  const [aboutData, setAboutData] = useState([]);
  const [message, setMessage] = useState("");
  // const [messageCond, setMessageCond] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const res = await api.get("/about");
        if (!isCancelled) {
          setAboutData(res.data);
        }

        // console.log("This is an AboutAdmin");
      } catch (error) {}
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [aboutData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setAbout("");
    await api
      .post(`about`, {
        about: about,
      })
      .then((res) => {
        setAboutData([...aboutData, about]);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    await api
      .delete(`about/${id}`)
      .then((res) => {
        setMessage(`${res.data.msg}`);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((err) => console.log(err));
    const filteredData = aboutData.filter((Item) => Item._id !== id);
    setAboutData(filteredData);
  };

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={onSubmitHandler}>
          <h4> About Component </h4>

          <label htmlFor="text"> About </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            name="textarea"
            cols="30"
            rows="3"
          ></textarea>
          <button type="submit">
            <span> Add Item</span>
          </button>
        </form>
      </div>

      <div className="same-item">
        <div id="aboutInfo" className="about-info">
          <h3 id="itemdel" className="item-delete-tab">
            <span>{message} </span>
          </h3>
          {aboutData?.map((item, index) => (
            <div key={`${item._id} || ${index} `}>
              <p>{item.about}</p>
              <div className="icons">
                <Link to={`/edit/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i
                  className="fas fa-trash"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item._id);
                  }}
                ></i>
              </div>

              {/* <h3 className="item-delete-tab">{message}</h3> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;
