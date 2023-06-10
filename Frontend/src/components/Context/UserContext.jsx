import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
axios.defaults.withCredentials = true;

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subject_id, setSubject_id] = useState("");
  const location = useLocation();
  const [previousRoute, setPreviousRoute] = useState("");

  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`http://localhost:5000/auth/login`, {
        username: username,
        password: password,
      });
      const user = data.data;
      setUser(user);
      setIsLoggedIn(true);
      console.log("berhasillogin");
      // navigate(-1);
      if (
        previousRoute === "/" ||
        previousRoute === "" ||
        previousRoute === "/login"
      ) {
        navigate("/dashboard");
      } else {
        console.log(previousRoute);
        navigate(previousRoute);
      }
    } catch (error) {
      console.error("Error: ", error.response.data.message);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    try {
      await axios.post(`http://localhost:5000/auth/logout`);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      error.response.data.message
        ? console.error("Error: ", error.response.data.message)
        : console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  const verifyToken = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/auth/token`);
      setUser(data.user);
      setIsLoggedIn(true);
    } catch (error) {
      navigate("/login");

      error.response.data.message
        ? console.error("Error: ", error.response.data.message)
        : console.error("Error: ", error);
    }
    setIsLoading(false);
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    subject_id,
    setSubject_id,
    verifyToken,
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    console.log(previousRoute);

    if (isLoggedIn === null || isLoggedIn === false) {
      verifyToken();
    }
    verifyToken();
    setPreviousRoute(location.pathname);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
