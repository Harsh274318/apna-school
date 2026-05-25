import React, { useContext, useRef } from 'react'
import Context from '../../components/context/Context.jsx';
import { toast } from 'react-toastify';
import api from '../../api.js';
import Loading from '../../components/forms/Loading.jsx';
const ViewStudents = () => {
    const rollNumberRef = useRef();
    const classRef = useRef();
    const sessionRef = useRef();
    const { apiData, setApiData } = useContext(Context)
    function findStudent(e) {
        e.preventDefault();
        if (!classRef.current.value.trim() || !rollNumberRef.current.value.trim() || !sessionRef.current.value.trim()) return toast.warning("input is empty")
        const roll = Number(rollNumberRef.current.value.trim())
        if (isNaN(roll)) return toast.error("Roll Number should be Number");
        if (roll < 100 || roll >= 1300) return toast.error("Invalid Roll number");
        const classRoom = Number(classRef.current.value.trim())
        if (isNaN(classRoom)) return toast.error("class should be Number");
        const session = sessionRef.current.value.trim()
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.get(`/student/${roll}?classRoom=${classRoom}&session=${session}`)
            .then(res => {
                // console.log(res.data.data)
                setApiData(prev => ({
                    ...prev, loading: false, data: res.data.data
                }))
                toast.success(res?.data?.message || "Student founded")
            }).catch(err => {
                setApiData(prev => ({
                    ...prev, loading: false
                }));
                 if (err?.response?.status === 401) {
                                    localStorage.removeItem("token");
                
                                    toast.error("login again");
                                    navigate("/login");
                                    return;
                                }
                toast.error(err?.response?.data?.err || "Student not found")
                console.log(err.message)
            })
    }
    return (<>

        <div className="search-container">
            <label htmlFor="student">Roll</label>
            <input type="number" min={100} id="student" className='Hclass' ref={rollNumberRef} placeholder='Ex: 121' />
            <label htmlFor="class">class</label>
            <input type="text" id='class' className='Hclass' ref={classRef} inputMode="numeric" min={1} max={12} placeholder='Ex: 1' />
            <select name="session" id="session" ref={sessionRef} className='selectStyle'>
                <option value="">--session--</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
                <option value="2028-29">2028-29</option>
                <option value="2029-30">2029-30</option>
                <option value="2030-31">2030-31</option>
            </select>
            <button type="button" onClick={findStudent}>Search</button>
        </div>
        {apiData.loading ? <Loading /> : apiData?.data && !apiData.loading &&
            // apiData?.data.map(item => (
            //     <>
            <div className="studentMain" key={apiData?.data._id}>
                <div className="basicDetails">
                    <div className="studentImage">
                        <img src={apiData?.data.userId.url} alt="Student" />
                    </div>
                    <div className="studentMeta">
                        <p className="studentName">{apiData?.data.userId.name}</p>
                        <p className="studentEmail">{apiData?.data.userId.email}</p>
                        <div className="badgeRow">
                            <span className="badge badge-blue">Roll: {apiData?.data.rollNumber}</span>
                            <span className="badge badge-teal">Class {apiData?.data.class}</span>
                            <span className="badge badge-purple">{apiData?.data.session}</span>
                            <span className="badge badge-green">{apiData?.data.isActive ? "Active" : "Inactive"}</span>
                        </div>
                    </div>
                </div>
                <div className="otherDetails">
                    <div className="detailItem">
                        <span className="detailLabel">Father's name</span>
                        <span className="detailValue">{apiData?.data.fatherName || "—"}</span>
                    </div>
                    <div className="detailItem">
                        <span className="detailLabel">Date of birth</span>
                        <span className="detailValue">{new Date(apiData?.data.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    </div>
                    <div className="detailItem">
                        <span className="detailLabel">Gender</span>
                        <span className="detailValue">{apiData?.data.gender}</span>
                    </div>
                    <div className="detailItem">
                        <span className="detailLabel">Parent mobile</span>
                        <span className="detailValue">{apiData?.data.parentMobile}</span>
                    </div>
                    <div className="detailItem">
                        <span className="detailLabel">Notify via</span>
                        <span className="detailValue">{apiData?.data.notifyMethod}</span>
                    </div>
                    <div className="detailItem">
                        <span className="detailLabel">Address</span>
                        <span className="detailValue">{apiData?.data.address}</span>
                    </div>
                </div>
            </div>
            // </>))

        }

    </>)
}
export default ViewStudents