// AllStudents.jsx
import React, { useContext, useEffect } from 'react'
import Context from '../../components/context/Context'
import api from '../../api';
import { toast } from 'react-toastify';
import Loading from '../../components/forms/Loading';
import { AiOutlineDelete } from 'react-icons/ai';
import EditStudent from './EditStudent';

const AllStudents = () => {
    const { apiData, setApiData } = useContext(Context);

    useEffect(() => {
        setApiData(prev => ({ ...prev, loading: true }))
        api.get("/students")
            .then(res => {
                setApiData(prev => ({ ...prev, loading: false, students: res.data.data }))
                toast.success("All students")
            })
            .catch(() => {
                setApiData(prev => ({ ...prev, loading: false }))
                toast.error("Students not found!")
            })
    }, [])

    function handelDelete(e, email) {
        e.preventDefault();
        if (!email) return toast.error("Email not Found!")
        setApiData(prev => ({ ...prev, loading: true }))
        api.delete("/delete-Student", { data: { email } })
            .then(() => {
                setApiData(prev => ({
                    ...prev, loading: false,
                    students: prev.students.filter(s => s?.userId?.email !== email)
                }))
                toast.success("Student deleted!")
            })
            .catch(() => {
                setApiData(prev => ({ ...prev, loading: false }))
                toast.error("Student not deleted!")
            })
    }

    function handleUpdate(form) {
        const student = apiData.updateStudent;
        if (!student) return;

        const rollNumber = student?.rollNumber;
        const userId = student?.userId?._id;

        if (!rollNumber || !userId) return toast.error("Student info missing!");

        setApiData(prev => ({ ...prev, loading: true }))

        api.patch(`/teacher/update-student?rollNumber=${rollNumber}&userId=${userId}`, {
            data: {
                fatherName: form.fatherName,
                dob: form.dob,
                gender: form.gender,
                parentMobile: form.parentMobile,
                address: form.address,
                notifyMethod: form.notifyMethod,
            }
        })
            .then(() => {
                setApiData(prev => ({
                    ...prev,
                    loading: false,
                    updateStudent: null,
                    students: prev.students.map(s =>
                        s._id === student._id
                            ? {
                                ...s,
                                fatherName: form.fatherName,
                                dob: form.dob,
                                gender: form.gender,
                                parentMobile: form.parentMobile,
                                address: form.address,
                                notifyMethod: form.notifyMethod,
                            }
                            : s
                    )
                }))
                toast.success("Student updated!")
            })
            .catch(() => {
                setApiData(prev => ({ ...prev, loading: false }))
                toast.error("Update failed!")
            })
    }

    return (
        <>
            {apiData.loading && <Loading />}

            {apiData.updateStudent && (
                <EditStudent
                    student={apiData.updateStudent}
                    onClose={() => setApiData(prev => ({ ...prev, updateStudent: null }))}
                    onUpdate={handleUpdate}
                />
            )}

            {!apiData.loading && (apiData.students || []).map(item => (
                <div className="studentMain" key={item?._id}>
                    <div className="basicDetails">
                        <div className="studentImage">
                            <img src={item?.userId?.url || (item?.gender === "male"
                                ? "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1776136342/maleUser_p4l5ft.jpg"
                                : "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1776136605/female_uydjww.jpg")}
                                alt="Student" />
                        </div>
                        <div className="studentMeta">
                            <p className="studentName">{item?.userId?.name || "User name"}</p>
                            <p className="studentEmail">{item?.userId?.email || "User Email"}</p>
                            <div className="badgeRow">
                                <span className="badge badge-blue">Roll: {item?.rollNumber}</span>
                                <span className="badge badge-teal">Class {item?.class}</span>
                                <span className="badge badge-purple">{item?.session}</span>
                                <span className="badge badge-green">{item?.isActive ? "Active" : "Inactive"}</span>
                            </div>
                        </div>
                        <div className='edit-btn'>
                            <button type='button' style={{
                                padding: "6px 12px",
                                backgroundColor: "#3b82f6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                marginRight: "8px"
                            }} onClick={() => setApiData(prev => ({ ...prev, updateStudent: item }))}>Edit</button>
                            <button type='button' style={{
                                padding: "6px 10px",
                                backgroundColor: "#ef4444",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }} onClick={(e) => handelDelete(e, item?.userId?.email)}><AiOutlineDelete /></button>
                        </div>
                    </div>
                    <div className="otherDetails">
                        <div className="detailItem">
                            <span className="detailLabel">Father's name</span>
                            <span className="detailValue">{item?.fatherName || "—"}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailLabel">Date of birth</span>
                            <span className="detailValue">{item?.dob
                                ? new Date(item.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                : "—"}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailLabel">Gender</span>
                            <span className="detailValue">{item?.gender}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailLabel">Parent mobile</span>
                            <span className="detailValue">{item?.parentMobile}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailLabel">Notify via</span>
                            <span className="detailValue">{item?.notifyMethod}</span>
                        </div>
                        <div className="detailItem">
                            <span className="detailLabel">Address</span>
                            <span className="detailValue">{item?.address}</span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AllStudents