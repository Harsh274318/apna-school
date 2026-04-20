import react, { useState } from "react";
import "./nav.css"
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [role, setRole] = useState("")
    const token = localStorage.getItem("token")

    function handalNavigate(e) {
        e.preventDefault()
        const localData = JSON.parse(localStorage.getItem("user"))
        const navi = localData?.role.toLowerCase()
        navigate(`/${navi}`)
        console.log("clicked")
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
                    onClick={() => navigate("teacher-query")}
                >Contact us</button>

                <button className="button">About</button>
            </div>

            <div className="loginSignup">
                {token ? <button className="button"
                    onClick={handalNavigate}
                >Dashboard</button> : <button className="button"
                    onClick={() => navigate("/login")}
                >Login</button>}
            </div>
        </div>



    </>)
}
export default Navbar;

const styles = {
    mainNav: {
        width: "",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",
        background: "#00000035",
        color: "white",
        flexWrap: "wrap",
        backDrop: "blur(6px)",
    },

    imgName: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },

    logo: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
    },

    pageLinks: {
        display: "flex",
        gap: "15px",
    },

    loginSignup: {
        display: "flex",
        gap: "10px",
    },

    button: {
        padding: "6px 12px",
        fontSize: "16px",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        background: "#00000058",
        color: "white",
    },

    // 🔥 responsive (manual handling)
    mobile: {
        mainNav: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
        },
        pageLinks: {
            width: "100%",
            justifyContent: "space-around",
        },
    },
};