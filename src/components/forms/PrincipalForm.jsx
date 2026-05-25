import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiEyelashes, GiEyeOfHorus } from "react-icons/gi";
import { toast } from "react-toastify";
import Loading from "./Loading.jsx";
import { RxCross2 } from "react-icons/rx";
const PrincipalForm = () => {
    const navigate = useNavigate()
    const [isload, setIsload] = useState(false)
    const [show, setShow] = useState(true);
    const [flag, setFlag] = useState(true)
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpaswordRef = useRef();
    const imageRef = useRef();

    async function handalPrincipal(e) {
        e.preventDefault();
        const formData = new FormData();
        if(passwordRef.current.value.length<8) return toast.error("Paasword length must be 8")
        if (passwordRef.current.value !== cpaswordRef.current.value) return toast.error("Both possword should be same ")
        formData.append("name", nameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
        const file = imageRef.current.files[0];
        formData.append("image", file);
        setIsload(true)
        axios.post("http://localhost:7001/api/create-principal", formData)
            .then(res => {
                console.log(res.data)
                toast.success(res.data.data.message)
            })
            .catch(err => {
                console.log(err.message)
                 if (err?.response?.status === 401) {
                                    localStorage.removeItem("token");
                
                                    toast.error("login again");
                                    navigate("/login");
                                    return;
                                }
                toast.error(err?.response?.data?.err)
            })
            .finally(setIsload(false))

    }
    return (
        <>
            {isload && <Loading />}
            {show && import.meta.env.VITE_IS_PRICNIPAL === "true" && <div
                className="tForm-image"
            >
                <button className="cut" id="cut" onClick={() => navigate(-1)}><RxCross2 /></button>
                <div className="form-container"
                >
                    <form onSubmit={handalPrincipal}>
                        <h2>Registere as Principal</h2>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            id="name"
                            ref={nameRef}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="email"
                            ref={emailRef}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <div className="password-div"><input type={flag ? "password" : "text"} id="password" ref={passwordRef}
                            required
                            className="passwordinput" />

                            <button id="toggle" onClick={() => setFlag(!flag)}>{flag ? <GiEyelashes className="close" /> : <GiEyeOfHorus className="close" />}</button>

                        </div>
                        <label htmlFor="cpassword">confirm password</label>
                        <input type="password" name="" id="cpassword"
                            ref={cpaswordRef}
                            required
                        />
                        <label htmlFor="file" >Upload image</label>
                        <input type="file" name="" id="file" accept="image"
                            ref={imageRef}
                            required
                        />
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
            }
        </>
    );
};
export default PrincipalForm;
