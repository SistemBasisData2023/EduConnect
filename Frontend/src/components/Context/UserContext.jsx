import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const value = {};

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
