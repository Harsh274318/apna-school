import React, { useState } from "react";
import Context from "./context";

const Provider = ({ children }) => {
    const [apiData, setApiData] = useState({ data: "", loading: "", error: "", posts: [], students: [], updateStudent: null })
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    return (<Context.Provider value={{ apiData, setApiData, token }}>
        {children}
    </Context.Provider>)
}
export default Provider;
