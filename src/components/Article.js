import  {React, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getDocs,getDoc, collection, deleteDoc, doc,updateDoc,arrayUnion,arrayRemove,onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/article.css";
import Comment from './Comment';

function Article() {
    const {id}=useParams();
    const [article, setArticle] = useState(null);
    const [user] = useAuthState(auth);
    let navigate = useNavigate();

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
        navigate("/");
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
            }).catch((e) => {
                  console.log(e);
            });
          }
          else{
              updateDoc(likesRef,{
                  likes:arrayUnion(userid)
              }).then(() => {
                  console.log("liked");
                  
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
        <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> <b>{article.title}</b></h1>
              </div>
              <div className="deletePost">
                {user && article.userId === auth.currentUser.uid && (
                  <button
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
            <div className="postTextContainer"> {article.description} </div>
            <button style={{cursor:"pointer"}} onClick={()=>{
              updatelike(article.likes);
            }}>like : - {article.likes.length}</button>
            <div className="comments">
                <Comment id={id}/>
            </div>
            <h3>@{article.createdBy}</h3>
          </div>:<></>}
    </div>
  )
}

export default Article