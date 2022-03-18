import React, { useState } from "react";
import "./Contact.css";
import image from "../../images/workspace.jpg";

import api from "../../api/Item";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [bool, setBool] = useState(false);

  const [processing, setProcessing] = useState(false);

  // const url = "http://localhost:5000/contact";

  const formSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      setBool(true);
      await api
        .post("/contact", {
          name: name,
          email: email,
          message: message,
        })
        .then((res) => {
          console.log("contact", res.data);
          setBanner(res.data.msg);
          setName("");
          setEmail("");
          setMessage("");
          setBool(false);
          setTimeout(() => {
            setBanner("");
          }, 2000);
          setProcessing(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <div className="contactForm">
        <h2 className="title">Contact Form</h2>

        <div className="contactForm-center">
          <div className="contact-info">
            <h4> Send your message </h4>
            <img src={image} alt="contactimage" />
          </div>

          <div className="contact_form">
            <form onSubmit={formSubmit}>
              <p> {banner} </p>
              <label htmlFor="name"> Name </label>
              <input
                name="name"
                type="text"
                placeholder="import name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email"> Email </label>
              <input
                name="email"
                type="email"
                placeholder="import email..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="message"> Message </label>
              <textarea
                type="text"
                name="message"
                placeholder="import contact..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <div className="send-btn">
                <button
                  disabled={processing}
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   formSubmit();
                  // }}
                  type="submit"
                >
                  <span> {bool ? "Wait..." : "send"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
