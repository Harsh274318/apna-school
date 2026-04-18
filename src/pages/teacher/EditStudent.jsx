// EditStudent.jsx
import React, { useState } from 'react'

const EditStudent = ({ student, onClose, onUpdate }) => {
    const [form, setForm] = useState({
        fatherName: student?.fatherName || "",
        dob: student?.dob ? new Date(student.dob).toISOString().split("T")[0] : "",
        gender: student?.gender || "",
        parentMobile: student?.parentMobile || "",
        address: student?.address || "",
        notifyMethod: student?.notifyMethod || "",
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(form);
    };

    return (
        <div style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center",
            justifyContent: "center", zIndex: 999
        }}>
            <div style={{
                background: "white", borderRadius: "12px",
                padding: "24px", width: "90%", maxWidth: "480px",
                maxHeight: "90vh", overflowY: "auto"
            }}>
                <h3 style={{ marginTop: 0 }}>Edit Student</h3>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Father's Name", name: "fatherName", type: "text" },
                        { label: "Date of Birth", name: "dob", type: "date" },
                        { label: "Parent Mobile", name: "parentMobile", type: "text" },
                        { label: "Address", name: "address", type: "text" },
                    ].map(field => (
                        <div key={field.name} style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#555" }}>
                                {field.label}
                            </label>
                            <input
                                name={field.name}
                                type={field.type}
                                value={form[field.name]}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #ddd" }}
                            />
                        </div>
                    ))}

                    <div style={{ marginBottom: "12px" }}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#555" }}>Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange}
                            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", color: "#555" }}>Notify Method</label>
                        <select name="notifyMethod" value={form.notifyMethod} onChange={handleChange}
                            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ddd" }}>
                            <option value="">Select</option>
                            <option value="sms">SMS</option>
                            <option value="email">Email</option>
                        </select>
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button type="button" onClick={onClose}
                            style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ddd", cursor: "pointer" }}>
                            Cancel
                        </button>
                        <button type="submit"
                            style={{ padding: "8px 16px", borderRadius: "6px", background: "#3b82f6", color: "white", border: "none", cursor: "pointer" }}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudent