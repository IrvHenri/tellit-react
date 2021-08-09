import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      axios
        .get("http://localhost:8000/api/users/data", {
          headers: {
            "auth-token": token,
          },
        })
        .then((res) => {
          console.log("USER DATA:", res.data.user);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
