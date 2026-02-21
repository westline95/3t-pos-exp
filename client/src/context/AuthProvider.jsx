import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    console.log(localStorage.getItem("persist") == "undefined")
    const checkPersist = localStorage.getItem("persist") ? JSON.parse(localStorage.getItem("persist")) : false;
    const [persist, setPersist] = useState(checkPersist);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;