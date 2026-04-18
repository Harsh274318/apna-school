import React, { useContext, useRef, useState } from 'react'
import { GiEyelashes, GiEyeOfHorus } from 'react-icons/gi';
import { toast } from 'react-toastify';
import api from '../api';
import Context from '../components/context/context';
import { BsListNested } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const [flag2, setFlag2] = useState(false)
    const [flag, setFlag] = useState(false)
    const { apiData, setApiData, } = useContext(Context);
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    function handelUpdate(e) {
        e.preventDefault();
        if (!oldPasswordRef.current.value.trim() || !newPasswordRef.current.value.trim()) return toast.error("Enter both password")
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!regex.test(oldPasswordRef.current.value.trim()) || !regex.test(newPasswordRef.current.value.trim())) return toast.error("password must be strong")
        if (oldPasswordRef.current.value.trim().length < 8 || newPasswordRef.current.value.trim().length < 8) return toast.error("Password less then 8 digits")
        const data = {
            oldPassword: oldPasswordRef.current.value.trim(),
            newPassword: newPasswordRef.current.value.trim(),
        }
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.patch("/user/update-password", data)
            .then(res => {
                toast.success("Password Updated");
                oldPasswordRef.current.value = ""
                newPasswordRef.current.value = ""
                setApiData(prev => ({
                    ...prev, loading: false
                }))
            })
            .catch(err => {
                toast.error(err.response?.data?.message || "Something is wrong")
                setApiData(prev => ({
                    ...prev, loading: false
                }))
            })

    }
    return (<>
        <div className='form-container'>
            <h2>Update Password</h2>
            <label htmlFor="old">
                Enter Current Password:
            </label>
            <div className="password-div">
                <input
                    type={flag ? "text" : "password"}
                    id="old"
                    ref={oldPasswordRef}
                    className="passwordinput"
                    placeholder="Current@123"
                />
                <span id="toggle" onClick={() => setFlag(!flag)}>
                    {flag ? (
                        <GiEyeOfHorus className="close" />
                    ) : (
                        <GiEyelashes className="close" />
                    )}
                </span>
            </div>
            <label htmlFor="new">New Password:</label>
            <div className="password-div">
                <input
                    type={flag2 ? "text" : "password"}
                    id="new"
                    ref={newPasswordRef}
                    className="passwordinput"
                    placeholder="NewHarsh@123"
                />
                <span id="toggle" onClick={() => setFlag2(!flag2)}>
                    {flag2 ? (
                        <GiEyeOfHorus className="close" />
                    ) : (
                        <GiEyelashes className="close" />
                    )}
                </span>
            </div>
            <button style={{ width: "100%" }} type='button' onClick={handelUpdate}>Update</button>
            <br />
            {user.role === "Principal" && <button style={{ width: "100%", background: "none", color: "blue" }} onClick={() => navigate("/principal/reset-password")}>Reset</button>}
        </div>
    </>)
}

export default UpdatePassword