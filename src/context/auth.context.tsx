"use client";

import { createContext, useEffect, useState, PropsWithChildren } from "react";
import authServices from "@/services/auth.services";

interface User {
  id?: string;
  email?: string;
  username?: string;
}

const AuthContext = createContext({
  loggedUser: {},
  loginUser: (userData: any) => {},
  logoutUser: () => {},
  authenticateUser: () => {},
  isFetchingUser: true,
});

function AuthProviderWrapper({ children }: PropsWithChildren) {
  const [loggedUser, setLoggedUser] = useState({});
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const loginUser = (userData: User) => {
    setLoggedUser(userData);
  };

  const logoutUser = () => {
    setLoggedUser({});
    setIsFetchingUser(false);
    localStorage.removeItem("authToken");
  };

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      authServices
        .verifyUser(token)
        .then(({ data }) => {
          loginUser(data.loggedUserData);
          setIsFetchingUser(false);
        })
        .catch((err) => logoutUser());
    } else {
      logoutUser();
    }
  };

  useEffect(() => authenticateUser(), []);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        loginUser,
        logoutUser,
        authenticateUser,
        isFetchingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
