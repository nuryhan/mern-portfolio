import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/Item";

const initialState = {
  project_id: "",
  title: "",
  description: "",
};

const EditProjects = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[2];

  // upload image
  const handleUploadImage = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.files[0];
      if (!file) return alert("No files exist!");

      if (file.size > 1024 * 1024) {
        return alert("Size is too big!");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Incorrect file format!");
      }

      let formData = new FormData();

      formData.append("file", file);

      const res = await api.post("/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete image
  const deleteImage = async () => {
    try {
      await api.post("/remove", { public_id: images.public_id });
      setImages(false);
    } catch (error) {}
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api
        .put(`/project/update/${path}`, { ...product, images })
        .then((res) => {
          setMessage(res.data.msg);
        });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      history("/admin");
    }, 2000);
  };

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    api
      .get(`/project/${path}`)
      .then((res) => {
        console.log(res.data);
        if (!unmounted) {
          setLoading(false);
        }
        setProducts({
          project_id: res.data.project_id,
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => {
        if (!unmounted) {
          console.log(err);
          setLoading(false);
        }
      });

    return () => {
      unmounted = true;
    };
  }, [path]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className="edit">
      <div className="main-container">
        <div className="same-component">
          <div className="same-form">
            <form onSubmit={onSubmit}>
              <h3 className="updated"> {message} </h3>
              <h4> Projects Component </h4>
              <label htmlFor="text">Id</label>
              <input
                value={product.project_id}
                onChange={(e) =>
                  setProducts({ ...product, project_id: e.target.value })
                }
                type="text"
                name="product_id"
                id="product_id"
              />

              <label htmlFor="text">Title </label>
              <input
                value={product.title}
                onChange={(e) =>
                  setProducts({ ...product, title: e.target.value })
                }
                type="text"
                name="title"
                id="title"
                required
              />

              <label htmlFor="text"> </label>
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProducts({ ...product, description: e.target.value })
                }
                cols="30"
                rows="3"
                type="text"
                name="description"
                id="description"
                required
              />

              <div className="upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUploadImage}
                  required
                />
                <div id="file_img" style={styleUpload}>
                  <img src={images ? images.url : ""} alt="iMages" />
                  <span onClick={deleteImage}> X</span>
                </div>
              </div>

              <div className="btns">
                <button type="submit" className="updateBtn">
                  Update Items
                </button>
                <Link to="/admin">
                  <button className="cancel-btn"> Cancel </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjects;
