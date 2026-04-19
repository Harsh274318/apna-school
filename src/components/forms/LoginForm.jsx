import React, { useContext, useRef, useState } from "react";
import { GiEyelashes, GiEyeOfHorus } from "react-icons/gi";
import api from "../../api";
import { toast } from "react-toastify";
import Context from "../context/Context.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { RxCross2 } from "react-icons/rx";

const LoginForm = () => {
    const location = useLocation();
    const obj = useContext(Context)
    const emailRef = useRef();
    const passwordRef = useRef();
    const [flag, setFlag] = useState(true)
    const throttleRef = useRef(false);
    const navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault();

        if (throttleRef.current) {
            toast.error("Wait for 5 seconds before trying again");
            return;
        }

        throttleRef.current = true;
        obj.setApiData(prev => ({ ...prev, loading: true }));
        api.post("/auth/login", {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
            .then((res) => {
                localStorage.setItem("token", res.data.data.token);
                const payload = { email: res.data.data.email, name: res.data.data.name, role: res.data.data.role, url: res.data.data.url, public_id: res.data.data.public_id, id: res.data.data.id }
                localStorage.setItem("user", JSON.stringify(payload))
                obj.setApiData(prev => ({ ...prev, data: res.data.data }))
                // res.data.data
                const role = res.data.data.role;
                if (role === "Principal") navigate("/principal");
                else if (role === "Teacher") navigate("/teacher");
                else if (role === "Student") navigate("/student");
                else { navigate("/") }
                toast.success(res.data.data.message || "login Successfully");
                emailRef.current.value = ""
                passwordRef.current.value = ""
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.response?.data?.message || "Login failed");
            })
            .finally(() => {
                obj.setApiData(prev => ({ ...prev, loading: false }))
                setTimeout(() => {
                    throttleRef.current = false;
                }, 5000);
            });
    };
    return (<>
        {obj.apiData.loading ? <Loading /> : <div className="tForm-image" id="floting">
            <div className="login-outter">
                <div className="form-container" >
                    <button type="button" id="cross" onClick={() => navigate("/")
                    }> <RxCross2 /> </button>
                    <form onSubmit={handleLogin}>
                        <h2>Login Here </h2>
                        <label htmlFor="email">Enter your registered EMAIL</label>
                        <input type="email" id="email" ref={emailRef} />

                        <label htmlFor="password">Enter Your Correct PASSWORD</label>


                        <div className="password-div"><input type={flag ? "password" : "text"} id="password" ref={passwordRef} className="passwordinput" />
                            {/* <TbEyeCode /> */}
                            <span id="toggle" onClick={() => setFlag(!flag)}>{flag ? <GiEyelashes className="close" /> : <GiEyeOfHorus className="close" />}</span>

                        </div>
                        <button type="submit"> Submit</button>
                    </form>
                </div>
            </div>
        </div >}
    </>)
}
export default LoginForm