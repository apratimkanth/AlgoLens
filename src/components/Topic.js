import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query,doc,updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import '../style/articles.css';
import { useNavigate } from 'react-router-dom';

function Topic({updateParentState}) {
    const [articles, setArticles] = useState([]);
  const postsCollectionRef = collection(db, 'Articles');
  const [distinctTopics, setDistinctTopics] = useState([]);
  let navigate = useNavigate();

  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Call getDistinctTopics here after setting articles
    } catch (err) {
      console.log(err);
    }
  };

  const getDistinctTopics = () => {
    // Use Set to store unique topics
    const uniqueTopics = new Set();

    // Iterate through each article and add its topic to the Set
    articles.forEach((article) => {
      if (article.topic) {
        uniqueTopics.add(article.topic);
      }
    });

    // Convert the Set back to an array
    let distinctTopics = Array.from(uniqueTopics);

    // Update the state with distinctTopics
    setDistinctTopics(distinctTopics);
  };

  useEffect(() => {
    getPosts();
  }, [/* Any dependencies you might need */]);

  useEffect(() => {
    // Trigger the logic for getting distinct topics
    getDistinctTopics();
  }, [articles]);

//   console.log(distinctTopics);
  return (
    <>
     {distinctTopics.length==0?(<></>):
            distinctTopics.map((topic,index)=><div onClick={()=>updateParentState(topic)} style={{cursor:"pointer"}} key={index} className='f-topic-name'>{topic}</div>)}
    </>
  )
}

export default Topic