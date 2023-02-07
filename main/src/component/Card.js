import React from 'react'
import './Card.css';
import { useState } from 'react';


export default function Card(props){
    const [imgUpload, setImgUpload] = useState(null);
    const [upImg, setupImg] = useState(false);

    const Update = async() =>{
        if(upImg){
            if(imgUpload == null){ return ;}
            await props.uploadImage(props.data.id, imgUpload) 
        }
        setupImg(!upImg)
    }

    const getInfo = () =>{
        if(props.data.image){
            return "Change Img"
        }else{
            return "Upload Img";
        }
    }

    const getClassname = () =>{
        if(props.data.rate === 10){
            return "container1";
        }else if(props.data.rate > 7){
            return "container3";
        }else if(props.data.rate > 4){
            return "container4"
        }else{
            return "container2";
        }
    }

    return(
        <>
            <div className={`card_container ${getClassname()}`}>
                <img src= {`${props.data.image}`} alt="" />
                <div className={`${getClassname()}`}>
                    <h2> <i className="bi bi-clipboard-heart-fill"></i> {props.data.title}</h2>
                    <h4>rating : {props.data.rate}</h4>

                    <div className='button_container'>
                        <button className='btn-one'>Update</button>
                        <button onClick={async () => await props.deleteList(props.data.id)} className='btn-one'>Delete</button>
                    </div>

                    <div className="uploadImg">
                        {upImg && <input type="file" onChange={(event) => setImgUpload(event.target.files[0])}/>}
                        <button onClick = {Update} className='btn-two'>{getInfo()}</button>
                    </div>
                </div>
            </div>            
        </>

        
    )
}

