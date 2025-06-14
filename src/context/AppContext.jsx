import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const backendUrl = 'https://eduport-backend-production.up.railway.app/user';
 
   const getUserData = async () => {
    
     try {
       const response = await axios.get(`${backendUrl}/profile`, {
         withCredentials: true, 
       });
    console.log(response.data);
       if (response.status === 200) {
         setUserData(response.data);
         setIsLoggedIn(true);
         return response.data;
       } else {
         setIsLoggedIn(false);
         console.log("Failed to fetch user data")
       }
     } catch (error) {
       setIsLoggedIn(false);
       if (error.response?.status === 401) {
         toast.error("Session expired. Please login again.");
       } else {
         if(isLoggedIn){
           toast.error(error?.message || "An unknown error occurred");
         }
       }
     }
   };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    backendUrl,
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
