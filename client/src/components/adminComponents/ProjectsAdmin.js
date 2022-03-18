import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import api from "../../api/Item";

const initialState = {
  project_id: "",
  title: "",
  description: "",
  images: null,
};

const ProjectsAdmin = () => {
  const [product, setProducts] = useState(initialState);
  const [images, setImages] = useState(false);
  const [message, setMessage] = useState("");
  const [projectData, setProjectData] = useState([]);

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
      await api.post("/project", { ...product, images }).then((res) => {
        setMessage(res.data.msg);
        setTimeout(() => {
          setMessage("");
        }, 2000);

        setProducts(initialState);
        setImages(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const res = await api.get("/project");
        if (!isCancelled) {
          setProjectData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [projectData]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  // delete functionality
  const deleteProject = (id) => {
    // delete from the client.

    api.delete(`/project/${id}`).then((res) => {
      setMessage(res.data.msg);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });

    const filteredProjects = projectData.filter((item) => item._id !== id);
    setProjectData(filteredProjects);
  };

  return (
    <div className="same-component">
      <div className="same-form">
        <form onSubmit={onSubmit}>
          <h4> Projects Component </h4>
          <label htmlFor="text"> Id</label>
          <input
            value={product.project_id}
            onChange={(e) =>
              setProducts({ ...product, project_id: e.target.value })
            }
            type="text"
            name="project_id"
            id="product_id"
          />

          <label htmlFor="text">Title </label>
          <input
            value={product.title}
            onChange={(e) => setProducts({ ...product, title: e.target.value })}
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
              onChange={handleUploadImage}
              type="file"
              name="file"
              id="file_up"
            />
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url : ""} alt="imagess" />
              <span onClick={deleteImage}> X</span>
            </div>
          </div>

          <button type="submit"> Add Item </button>
        </form>
      </div>

      <div className="same-item">
        <div className="about-info">
          {projectData.map((item) => (
            <div key={item._id} className="projects-admin">
              <div className="icons">
                <Link to={`/editproject/${item._id}`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <i
                  onClick={() => deleteProject(item._id)}
                  className="fas fa-trash"
                ></i>
              </div>

              <div className="single-project">
                <div className="single-project-img">
                  <img src={item.images.url} alt="" />
                </div>

                <div className="single-project-info">
                  <h3> {item.title} </h3>
                  <p>{item.description}</p>
                </div>
              </div>

              <h3 className="item-delete-tab"> {message} </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
