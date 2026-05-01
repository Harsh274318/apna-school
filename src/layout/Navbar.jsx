import react, { useState } from "react";
import "./nav.css"
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";


const Navbar = () => {
    const [role, setRole] = useState("")
    const token = localStorage.getItem("token")
    const [open, setOpen] = useState(false);
    function handalNavigate(e) {
        e.preventDefault()
        setOpen(!open)
        const localData = JSON.parse(localStorage.getItem("user"))
        const navi = localData?.role.toLowerCase()
        navigate(`/${navi}`)
        // console.log("clicked")
    }

    const navigate = useNavigate()
    return (<>
        <div className="mainNav">
            <div className="imgName">
                <img className="logo" src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775468319/apnaSchool1234_x4i4up.png" />
                <h1>{import.meta.env.VITE_SCHOOL_NAME}</h1>
            </div>

            <div className="pageLinks">
                <button className="button"
                    onClick={() => { navigate("/") }}
                >Home</button>
                <button className="button"
                    onClick={() => navigate("/teacher-query")}
                >Contact us</button>

                <button className="button"
                    onClick={() => navigate("/public-post")}
                >About</button>
            </div>

            <div className="loginSignup ttt">
                {token ? <button className="button"
                    onClick={handalNavigate}
                >Dashboard</button> : <button className="button"
                    onClick={() => navigate("/login")}
                >Login</button>}
            </div>
            <div className="top-bar mobile">
                <button className="hamburger" onClick={() => setOpen(!open)}>
                    <FaBars />
                </button>

            </div>
            <div className={`comman-nav-btns ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
                <button className="button"
                    onClick={() => { { navigate("/") }; setOpen(!open) }}
                >Home</button>
                <button className="button"
                    onClick={() => { navigate("/teacher-query"); setOpen(!open) }}
                >Contact us</button>

                <button className="button"
                    onClick={() => { navigate("/public-post"); setOpen(!open) }}
                >About</button>
                <div className="loginSignup">
                    {token ? <button className="button"
                        onClick={handalNavigate}
                    >Dashboard</button> : <button className="button"
                        onClick={() => { navigate("/login"); setOpen(!open) }}
                    >Login</button>}
                </div>
            </div>

        </div>



    </>)
}
export default Navbar;
