import { useContext, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { toast } from "react-toastify";
import api from "../api";
import Context from "../components/context/context";
import "./posts.css"




const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const titleRef = useRef();
  const description = useRef();
  const imageRef = useRef();
  const { apiData, setApiData } = useContext(Context)
  function handelCancel(e) {
    e.preventDefault()
    titleRef.current.value = ""
    description.current.value = ""
    imageRef.current.value = ""
    document.querySelectorAll('input[name="category"]').forEach(r => r.checked = false);
  }
  function handelPost(e) {
    e.preventDefault()
    const category = document.querySelector('input[name="category"]:checked')?.value;
    if (!titleRef.current.value.trim() || !description.current.value.trim() || !category.trim()) return toast.error("Fill all fileds");
    if (titleRef.current.value.trim().length < 5 || description.current.value.trim().length < 10) return toast.error("Write well");
    const formData = new FormData()
    formData.append("title", titleRef.current.value.trim());
    formData.append("description", description.current.value.trim());
    formData.append("category", category.trim())
    formData.append("name", user.name)
    const file = imageRef.current.files[0];
    if (file) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > 3) return toast.error("File must be less than 3MB");
      formData.append("image", file)
    }
    setApiData(prev => ({
      ...prev, loading: true
    }))
    api.post("/social/school-post", formData)
      .then(res => {
        setApiData(prev => ({
          ...prev, loading: false, data: res.data.data
        }))

        titleRef.current.value = ""
        description.current.value = ""
        imageRef.current.value = ""
        document.querySelectorAll('input[name="category"]').forEach(r => r.checked = false);

        toast.success("Post Created successfully!");

      })
      .catch(err => {
        console.log(err.message);
        toast.error("Something is wrong")
      })

  }


  return (<>

    <div className="create-post-card">
      <div className="post-hearder">
        <div className="user-image">
          <img src={user?.url || 0} alt={"user Image"} />
        </div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="post-details">
        <input type="text"
          name=""
          placeholder="Title"
          ref={titleRef}
          id="" />
        <textarea name=""
          placeholder="Description"
          ref={description}
          id="" />
        <label htmlFor="image">
          <CiImageOn className="image-icon" /> Add image
          <input type="file" name="image" accept="image/*" id="image" ref={imageRef} style={{ display: "none" }} />
        </label>
        <div className="category-pill">
          <label htmlFor="study">Study
            <input type="radio" name="category" id="study" value="study" style={{ display: "none" }} />
          </label>
          <label htmlFor="student">Student
            <input type="radio" name="category" id="student" value="student" style={{ display: "none" }} />
          </label>
          <label htmlFor="news">News
            <input type="radio" name="category" id="news" value="news" style={{ display: "none" }} />
          </label>
          <label htmlFor="general">General
            <input type="radio" name="category" id="general" value="general" style={{ display: "none" }} />
          </label>
          <label htmlFor="announcement">Announcement
            <input type="radio" name="category" id="announcement" value="announcement" style={{ display: "none" }} />
          </label>
        </div>

      </div>
      <button type="button" className="btn-Cancel" onClick={handelCancel}>Cancel</button>
      <button type="submit" className="btn-Create" onClick={handelPost}>Create post</button>

    </div>
  </>)


}
export default CreatePost
// const CreatePost = () => {
//   const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("user")))
//   const onPost = 0
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const categories = [
//     { label: "Study", value: "study", bg: "#EEEDFE", color: "#3C3489" },
//     { label: "News", value: "news", bg: "#FAEEDA", color: "#633806" },
//     { label: "Announcement", value: "announcement", bg: "#E6F1FB", color: "#0C447C" },
//     { label: "General", value: "general", bg: "#F1EFE8", color: "#444441" },
//   ];

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview("");
//   };

//   const handleSubmit = () => {
//     if (!title.trim() || !description.trim()) return toast.error("Title and description required");
//     if (!category) return toast.error("Select a category");
//     const form = new FormData();
//     form.append("title", title);
//     form.append("description", description);
//     form.append("category", category);
//     if (image) form.append("image", image);
//     // api call here
//     api.post("/posts", form).then(res => {
//       toast.success("Posted!");
//       onPost?.();
//     }).catch(() => toast.error("Something went wrong"));
//   };

//   return (
//     <div className="create-post-card">
//       <div className="create-post-header">
//         <div className="post-avatar">
//           <img src={currentUser?.url} alt={currentUser?.name} />
//         </div>
//         <p className="create-post-name">{currentUser?.name}</p>
//       </div>

//       <div className="create-post-body">
//         <input
//           type="text"
//           className="create-post-input"
//           placeholder="Title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//         />
//         <textarea
//           className="create-post-textarea"
//           placeholder="What's on your mind? Write a description..."
//           rows={4}
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//         />

//         <p className="create-post-label">Category</p>
//         <div className="category-pills">
//           {categories.map(cat => (
//             <button
//               key={cat.value}
//               type="button"
//               className="cat-pill"
//               onClick={() => setCategory(cat.value)}
//               style={category === cat.value
//                 ? { background: cat.bg, color: cat.color, border: `0.5px solid ${cat.color}` }
//                 : {}
//               }
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {preview && (
//           <div className="img-preview-box">
//             <img src={preview} alt="preview" />
//             <button className="img-remove-btn" onClick={removeImage}>x</button>
//           </div>
//         )}

//         <label className="img-upload-label">
//           <input type="file" accept="image/*" onChange={handleImage}
//            style={{ display: "none" }}
//            />
//           {/* <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <rect x="3" y="3" width="18" height="18" rx="2" />
//             <circle cx="8.5" cy="8.5" r="1.5" />
//             <polyline points="21 15 16 10 5 21" />
//           </svg> */}
//           Add image
//         </label>
//       </div>

//       <div className="create-post-footer">
//         <button className="btn-post" onClick={handleSubmit}>Post</button>
//       </div>
//     </div>
//   );
// };

// export default CreatePost