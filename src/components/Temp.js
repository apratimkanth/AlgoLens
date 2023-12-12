import  {React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getDocs,getDoc, collection, deleteDoc, doc,updateDoc,arrayUnion,arrayRemove,onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/temp.css";
import Comment from './Comment';
import { toast } from "react-toastify";

function Temp() {
    const {id}=useParams();
    const [article, setArticle] = useState(null);
    const [user] = useAuthState(auth);
    let navigate = useNavigate();
   const [text_color,setText_color]=useState("text_color_black");

    const getarticle=async ()=>{
        const docRef = doc(db, "Articles", id);
        try {
            const docSnap = await getDoc(docRef);
            setArticle(docSnap.data());
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getarticle();
    }, []);
    // console.log(article);

    const deletePost = async () => {
        const postDoc = doc(db, "Articles", id);
        await deleteDoc(postDoc);
        toast("Article deleted successfully", { type: "success" });
              setInterval(() => {
                window.location.pathname = "/";
            }, 1000);
        // getarticle();
    };
    
    const updatelike=async(likes)=>{
        if (!user) {
          alert("Please login first");
          navigate("/signin");
        }
        else{
          const likesRef = doc(db, "Articles", id);
          const userid=user.uid;
          if (likes?.includes(userid)) {
            updateDoc(likesRef, {
              likes: arrayRemove(userid),
            }).then(() => {
                console.log("unliked");
                setText_color("text_color_black");
            }).catch((e) => {
                  console.log(e);
            });
          }
          else{
              updateDoc(likesRef,{
                  likes:arrayUnion(userid)
              }).then(() => {
                  console.log("liked");
                  setText_color("text_color_blue");
                  
              }).catch((e) => {
                    console.log(e);
              });
          }
          getarticle();
        }
    }

  return (
    <div className='article'>
        {article!=null?
    <div className="post-container">
      {/* Title */}
      <h1 className="post-title"><b>{article.title}</b></h1>

      {/* Image */}
      <img
        className="post-image"
        src={article.imageUrl}
        alt="Post Image"
      />

      {/* Text */}
      <p className="post-text">
        {article.description}
      </p>

      {/* Like and Delete buttons */}
      <div className="post-buttons">
      <p className={'like-display'+' '+text_color}>
        <i className="fa fa-thumbs-up" style={{ fontSize : "20px",marginRight:"2px",cursor:"pointer"}} onClick={()=>{
              updatelike(article.likes);
        }}></i>
        <p >{article.likes?.length}</p>
      </p>
        {/* <button className="like-button" style={{cursor:"pointer"}} onClick={()=>{
              updatelike(article.likes);
            }}>like : - {article.likes.length}</button> */}
        <div>
        {user && article.userId === auth.currentUser.uid && (
                  <button className="delete-button"
                    onClick={() => {
                      deletePost();
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
        )}
        </div>
      </div>

      {/* Comment section */}
      <div className="comment-section">
            <Comment id={id}/>
      </div>
      <h3>@{article.createdBy}</h3>
    </div>:<></>}
    </div>
  );
}

export default Temp