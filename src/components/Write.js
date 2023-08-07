import {React, useState } from 'react';
import '../style/write.css';
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate,redirect } from "react-router-dom";

const Write = () => {
  const [user] = useAuthState(auth);
  let navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const handleChange=(e)=>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleImageChange=(e)=>{
    setFormData({ ...formData, image: e.target.files[0] });
  }
  const handlePublish = () => {
    // setFormData({ ...formData, title: title1 });
    // setFormData({ ...formData, topic: topic1});
    // setFormData({ ...formData, description: text1 });
    console.log(formData.title);
    console.log(formData.topic);
    console.log(formData.description);
    console.log(formData.image);
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          topic:"",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            topic:formData.topic,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy:user.displayName,
            userId:user.uid,
            likes:[],
            comments:[]
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
              setInterval(() => {
                window.location.pathname = "/home";
            }, 1000);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      <div>
        <label>Title:</label>
        <input
              type="text"
              name="title"
              // className="form-control"
              placeholder="Title..."
              value={formData.title}
              onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Topic:</label>
        <input
          name="topic"
          // className="form-control"
          placeholder="Topic..."
          value={formData.topic}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Text:</label>
        <textarea
          name="description"
          // className="form-control"
          placeholder="description..."
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
       {/* image */}
       <label htmlFor="">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={(e) => handleImageChange(e)}
          />

          {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
      <button onClick={handlePublish} className='publish'>Publish</button>
    </div>
  );
};

export default Write;
