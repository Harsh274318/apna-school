import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import Context from '../../components/context/context';
import Loading from '../../components/forms/Loading';

const AddHomeWork = () => {
    const { apiData, setApiData } = useContext(Context)
    const [homeworks, setHomeworks] = useState([
        { title: "", description: "" }
    ]);
    const addField = () => {
        const last = homeworks[homeworks.length - 1];
        if (!last.title.trim() || !last.description.trim()) {
            return toast.error("Fill previous field first");
        }
        setHomeworks(prev => [
            ...prev,
            { title: "", description: "" }
        ]);
    };

    const handleChange = (index, field, value) => {
        const updated = [...homeworks];
        updated[index][field] = value;
        setHomeworks(updated);
    };
    function handleSubmit(e) {
        e.preventDefault();
        const isEmpty = homeworks.some(
            item => !item.title.trim() || !item.description.trim()
        );
        if (isEmpty) return toast.error("Fill all homework fields");
        const cleaned = homeworks.map(item => ({
            title: item.title.trim(),
            description: item.description.trim()
        }));
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.post("/teacher/homework", { homeWork: cleaned })
            .then(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                setHomeworks([
                    { title: "", description: "" }
                ])
                toast.success("Homework added successfully")
            })
            .catch(() => {
                setApiData(prev => ({
                    ...prev, loading: false
                }))
                toast.error("Something is wrong")
            })

    }
    return (
        <>
            {apiData.loading && <Loading />}
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2>Homework</h2>
                    {homeworks.map((item, index) => (
                        <div key={index} >
                            <input
                                placeholder="Title"
                                value={item.title}
                                style={{ width: "90%", marginBottom: "5px" }}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                            />
                            <br />
                            <textarea
                                placeholder="Description"
                                value={item.description}
                                style={{ width: "90%" }}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addField}>+ Add More</button>
                    <button type='submit'>Submit</button>
                </form>
            </div>

        </>
    )
}

export default AddHomeWork