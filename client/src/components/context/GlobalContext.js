import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../../api/Item";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [about, setAbout] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [project, setProject] = useState([]);

  // checking token login
  const url = `/user/verify`;
  useEffect(() => {
    // let isCancelled = false;
    const checkLoginToken = async () => {
      const token = localStorage.getItem("tokenStore");

      if (token) {
        const verified = await api.get(url, {
          headers: { Authorization: token },
        });
        // console.log(verified);

        setIsLogin(verified.data);

        if (verified.data === false) {
          return localStorage.clear();
        } else {
          setIsLogin(false);
        }
      }
      //this means loggedIn is true
    };

    checkLoginToken();
  }, [url]);

  // fetching  data

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const res1 = await api.get("/about");

        const res2 = await api.get("/education");

        const res3 = await api.get("/experience");

        const res4 = await api.get("/project");

        if (!isCancelled) {
          setAbout(res1.data);
          setEducation(res2.data);
          setExperience(res3.data);
          setProject(res4.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [about, education, experience, project]);

  const state = {
    about: [about, setAbout],
    education: [education, setEducation],
    experience: [experience, setExperience],
    projects: [project, setProject],
    isLogin: [isLogin, setIsLogin],
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
// make sure use
// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };
