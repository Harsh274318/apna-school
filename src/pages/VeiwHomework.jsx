import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../components/context/context";
import { toast } from "react-toastify";
import api from "../api";
import AddSessions from "./principal/AddSessions";

const VeiwHomework = () => {
    const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata"
    });
    const [homework, setHomework] = useState(null)
    const { apiData, setApiData } = useContext(Context)
    const user = JSON.parse(localStorage.getItem("user") || "1")

    const classRef = useRef();
    const dateRef = useRef();
    function handelHomework(e) {
        e.preventDefault()
        const useClass = classRef.current.value.trim();
        const date = dateRef.current.value.trim();
        if (!date) return toast.warning("Select date")
        if (user.role == "Principal" || user.role == "Teacher") {
            if (!useClass) return toast.warning("Select a class");
            if (isNaN(Number(useClass))) return toast.warning("class must be number");
            if (useClass > 13 || useClass < 1) return toast.warning("select between 1 to 12");
        }
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.get(`/homework?date=${date}&useClass=${useClass}`)
            .then(res => {
                setApiData(prev => ({
                    ...prev, loading: false,
                }))
                setHomework(res.data.data)
                toast.success("Homework found")
            }).catch(() => {
                setApiData(prev => ({
                    ...prev, loading: false,
                }))
                toast.error("Something is wrong")
            })
    }
    useEffect(() => {
        if (user?.role === "Student") {
            setApiData(prev => ({ ...prev, loading: true }));

            api.get(`/homework?date=${today}`)
                .then(res => {
                    setApiData(prev => ({ ...prev, loading: false }));
                    setHomework(res.data.data);
                })
                .catch(() => {
                    setApiData(prev => ({ ...prev, loading: false }));
                });
        }
    }, []);
    return (
        <>
            <div className="container">

                <div className="card">
                    <div className="cardHeader">
                        <div className="headingDiv">
                            <h2 className="heading">Homework List</h2>
                        </div>
                        <div className="searchDiv">
                            {(user.role == "Principal" || user.role == "Teacher") &&
                                <span><label htmlFor="class" className="class">Class</label>
                                    <input type="number" className="Hclass" id="class" ref={classRef} inputMode="numeric" min={1} max={12} placeholder="2" />
                                </span>
                            }
                            <span>
                                <input type="date" className="date-input" name="date" ref={dateRef} id="date" max={today} />
                            </span>
                            <button type="button" className="viewBtn" onClick={handelHomework}>View</button>
                        </div>

                    </div>
                    {(user.role == "Principal") && <AddSessions />}

                    {!apiData.loading && homework && <div className="list">
                        {homework.map((item, index) => (
                            <div className="listItem" key={index}>
                                <div className="title">{item.title}</div>
                                <div className="description">{item.description}</div>
                            </div>
                        ))}

                    </div> || <div style={{ textAlign: "center" }}>
                            <h2>Homework not found yet</h2>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default VeiwHomework;
