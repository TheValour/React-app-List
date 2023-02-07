import './App.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Card from './component/Card';
import {useEffect, useState } from 'react'

import {db, storage} from "./firebaseconfig"
import {collection, getDocs, doc, addDoc, deleteDoc, updateDoc} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';


function App() {

  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "List")
  
// Retreving the data from DATABASE and making a list -----------
  useEffect(() =>{ 
    const getList = async () =>{
      const data = await getDocs(usersRef);
      setUsers(data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
      })));
    } 
    getList();
  },[])
  
  // Creating a member and it to DATABASE -------------------
  const creteList = async (tempdata)=>{
    await addDoc(usersRef, tempdata);
  }
  
// Deleting a member from DATABASE(List) --------------------  
  const deleteList = async (id) =>{
    const userDoc = doc(db, "List", id);
    await deleteDoc(userDoc);
    
    const userData = ref(storage, `images/${id}` );
    await deleteObject(userData)
  }
  
// uploading image to firebase-STORAGE and then adding its link to firebase-DATABASE ------
  const insertLink = async (id, url) =>{
    const userDoc = doc(db, "List", id);
    const newFields = {image : url};
    await updateDoc(userDoc, newFields);
  }

  const uploadImage = async(id, imgData) =>{
    const imageRef = ref(storage, `images/${id}`)
    uploadBytes(imageRef, imgData).then(() =>{
      alert("Uploaded");
    })

    const data = await getDownloadURL(imageRef)
    console.log(data);
    insertLink(id, data);
  }

  
// creating a CARD varible -----------------
  const cards = users.map(item =>{
    return (
      <Card data = {item} 
        deleteList = {deleteList} 
        uploadImage = {uploadImage}
      />
    )
  })

// Main block -------------------- 
  return (
    <div className="App">
        <Navbar creteList = {creteList}/>
        <>
          {cards }
        </>
        <Footer/>
    </div>
  );
}

export default App;
