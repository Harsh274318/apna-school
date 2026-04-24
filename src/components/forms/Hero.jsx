import react, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar.jsx";



const Hero = () => {
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (["/teacher-query", "/student-query", "login"].includes(path)) {
            window.scrollTo({
                top: document.documentElement.scrollHeight - window.innerHeight - 200,
                behavior: "smooth",
            });
        } else if (path === "/") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [location]);

    return (<>
        <Navbar />
        <div className="Hero-banner">
            <div className="Hero-welcome">
                Welcome to <span className="welcome_apna">{import.meta.env.VITE_SCHOOL_NAME}</span> — where learning is joyful, personalized, and limitless!
            </div>
            {/* <img src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775540601/Futuristic_classroom_dmyc82.png" alt="" /> */}
        </div>
        <div className="Hero-parentDiv">
            <div className="Hero-leftSide">
                <div>
                    <div className="Hero-tagLine">Learn Without <span className="Hero-diffrent-color">Limits</span>. Teach Without Barriers.</div>
                    <div className="Hero-aboutShort"> <span className="apna-school">{import.meta.env.VITE_SCHOOL_NAME}</span> unites students and teachers on one intelligent, easy-to-use platform designed for meaningful learning. It enables seamless communication, real-time progress tracking, and deeper engagement through interactive tools. By simplifying collaboration and providing actionable insights, it helps create a more connected, motivating, and joyful educational experience for everyone involved.</div>
                    <div className="Hero-conect-us-as-Student">
                        <button className="Hero-study-btn left-btn" onClick={() => navigate("student-query")}>Start Learning</button>
                        <button className="Hero-Know-btn left-btn">Know About Us</button>
                    </div>
                    <div className="Hero-happy-img-div">

                        <img src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775529929/happyImage_iqjnfi.png" alt="" />
                        <div className="Hero-school-score">
                            <div className="Hero-score-card">
                                <div className="Hero-inner-score">5000+</div>
                                <div className="Hero-score-text">Students</div></div>
                            <div className="Hero-score-card">
                                <div className="Hero-inner-score">600+</div>
                                <div className="Hero-score-text">Teachers</div></div>
                            <div className="Hero-score-card">
                                <div className="Hero-inner-score">98%</div>
                                <div className="Hero-score-text">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="Hero-rightSide">
                <div className="Hero-ai-intigrat hero-Card">
                    <img className="Hero-images" src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775495976/AISchool_srhd41.png" alt="ai-intigrat" />
                    <h1 className="Hero-headings">AI-Powered Learning Paths</h1>
                    <p className="Hero-pera">Delivers personalized curricula that adapt to each student’s pace, learning style, and individual goals using intelligent analytics. By continuously analyzing performance and engagement, it tailors content, adjusts difficulty, and recommends targeted resources, creating a more effective, flexible, and student-centered learning experience that maximizes growth and long-term success</p>
                </div>
                <div className="live-Analytics hero-Card">
                    <img className="Hero-images" src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775495975/LiveSchool_oymbuh.png" alt="live-Analytics" />
                    <h1 className="Hero-headings">Live Analytics</h1>
                    <p className="Hero-pera">Provides real-time insights to track student performance, identify gaps, and monitor progress, enabling personalized teaching, timely interventions, and better outcomes while keeping students consistently engaged.</p>
                </div>
                <div className="Gamified-Progress hero-Card">
                    <img className="Hero-images" src="https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775495976/XPSchool_uaphu5.png" alt="Gamified Progress" />
                    <h1 className="Hero-headings">Gamified Progress</h1>
                    <p className="Hero-pera">Students earn XP, unlock badges, and level up as they progress, turning learning into an engaging, game-like experience that motivates consistent participation and enjoyment.</p>
                </div>
            </div>

        </div>
        <div className="Teacher-form">
            <div className="Teacher-text">
                <h1>Are you a Teacher ?</h1>
                <p>Join 600+ educators and create your first course today. Free to start.</p>
            </div>
            <div className="teacher-btn ">
                <button className="Hero-study-btn" onClick={() => navigate("teacher-query")}>Apply as Teacher </button>
            </div>
        </div>
        <Outlet />
    </>)
}
export default Hero
