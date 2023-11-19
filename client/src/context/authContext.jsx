import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, { withCredentials: true });
    setCurrentUser(res.data);
  }

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
  
}


export const useGlobalContext = () => {
  return useContext(AuthContext);
}