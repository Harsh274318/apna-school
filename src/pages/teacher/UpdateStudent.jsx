import React, { useContext, useEffect, useState } from 'react'
import Context from '../../components/context/Context';
import { toast } from 'react-toastify';
import Loading from '../../components/forms/Loading';
import api from '../../api';

const UpdateStudent = () => {
    const { apiData, setApiData } = useContext(Context)
    const [editStudent, setEditStudent] = useState(apiData.updateStudent);

    function handleUpdate(e) {
        if (!editStudent.fatherName?.trim()) return toast.error("Father name required");

        if (!editStudent.dob) return toast.error("DOB required");
        if (new Date(editStudent.dob) > new Date()) return toast.error("DOB can't be future");
        if (!["male", "female"].includes(editStudent.gender)) return toast.error("Select valid gender");
        if (!/^[6-9]\d{9}$/.test(editStudent.parentMobile)) return toast.error("Invalid mobile number");
        if (!["sms", "email"].includes(editStudent.notifyMethod)) return toast.error("Invalid notify method");
        if (!editStudent.address?.trim() || editStudent.address.length < 5) return toast.error("Address too short");
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.patch(`/update-student?rollNumber=${editStudent?.rollNumber}&userId=${editStudent?._id}`, editStudent)
            .then(() => {
                setApiData(prev => ({
                    ...prev, loading: false, updateStudent: null
                }))

                toast.success("Student updated")
            })
            .catch(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error("Something is wrong")
            })

    }
    useEffect(() => {
        setEditStudent(apiData.updateStudent);
    }, [apiData.updateStudent]);
    return (<>
        {apiData.loading && <Loading />}
        {!apiData.loading && editStudent && (
            <div className="editForm">

                <input
                    value={editStudent.fatherName || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, fatherName: e.target.value })}
                    placeholder="Father name"
                />

                <input
                    type="date"
                    value={editStudent.dob?.slice(0, 10) || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })}
                />

                <select
                    value={editStudent.gender || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })}
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input
                    value={editStudent.parentMobile || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, parentMobile: e.target.value })}
                    placeholder="Parent mobile"
                />

                <select
                    value={editStudent.notifyMethod || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, notifyMethod: e.target.value })}
                >
                    <option value="sms">SMS</option>
                    <option value="email">email</option>
                </select>

                <input
                    value={editStudent.address || ""}
                    onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })}
                    placeholder="Address"
                />

                <button onClick={handleUpdate}>Update</button>
            </div>
        )}




    </>)
}

export default UpdateStudent