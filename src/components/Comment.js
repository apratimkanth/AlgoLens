import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc,getDoc } from "firebase/firestore";
import  {React, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth,db } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "../style/comment.css";


function Comment({id}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isAuth] = useAuthState(auth);
    let navigate = useNavigate();

    // const [currentlyLoggedinUser] = useAuthState(auth);
    const commentRef = doc(db, "Articles", id);

    const getcomments=async()=>{
        const docRef = doc(db, "Articles", id);
        try {
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data().comments);
            setComments(docSnap.data().comments);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
    //   const docRef = doc(db, "Articles", id);
    //   onSnapshot(docRef, (snapshot) => {
    //     setComments(snapshot.data().comments);
    //   });
    getcomments();
    }, []);
  
    const handleChangeComment = (e) => {
        if (!isAuth) {
            alert("Please login first");
            navigate("/login");
          }
      if (e.key === "Enter") {
        updateDoc(commentRef, {
          comments: arrayUnion({
            user: auth.currentUser.uid,
            userName: auth.currentUser.displayName,
            comment: comment,
            commentId: uuidv4(),
          }),
        }).then(() => {
          setComment("");
        });
      }
      getcomments();
    };
  
    // delete comment function
    const handleDeleteComment = (comment) => {
    //   console.log(comment);
      updateDoc(commentRef, {
          comments:arrayRemove(comment),
      })
      .then((e) => {
          console.log(e);
      })
      .catch((error) => {
          console.log(error);
      })
      getcomments();
    };

    console.log(comments);
  return (
    <div>
      Comment
      <div className="container">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName}) => (
            <div key={commentId}>
              <div className="border p-2 mt-2 row">
                <div className="col-11">
                  <span
                    className={`badge ${
                      isAuth && user === auth.currentUser.uid
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    {userName}
                  </span>
                  {comment}
                </div>
                <div className="col-1 deletePost">
                  {isAuth && user === auth.currentUser.uid && (
                    // <i
                    //   className="fa fa-times"
                    //   style={{ cursor: "pointer" }}
                    //   onClick={() => handleDeleteComment({ commentId, user, comment, userName})}
                    // ></i>
                    <button
                    onClick={() => handleDeleteComment({ commentId, user, comment, userName})}
                  >
                    {" "}
                    &#128465;
                  </button>
                  )}
                </div>
              </div>
            </div>
          ))
        }
        {/* {isAuth && ( */}

          <input
            type="text"
            className="form-control mt-4 mb-5"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add a comment"
            onKeyUp={(e) => {
              handleChangeComment(e);
            }}
          />

        {/* )} */}
      </div>  
    </div>
  )
}

export default Comment