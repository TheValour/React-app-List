import React from 'react'
import { useState, useRef } from 'react';
import './Navbar.css';
import {useOnScreen} from './useOnScreen';

const Navbar = (props) => {
    const [newTitle, setnewTitle] = useState("");
    const [newRate, setnewRate] = useState(0);

    const updateData = () => {

        console.log("Inside update Block")
        if (newRate > 10) {
            console.log("inside >10");
            setnewRate(10);
        } else if (newRate < 0) {
            console.log("inside <10");
            setnewRate(0);
        }
        const tempData = { title: newTitle, rate: Math.abs(newRate % 11), image: "" };
        console.log(tempData)
        if (tempData.title !== "") {
            props.creteList(tempData)
        }
    }

    const elementRef = useRef(null);
    const isOnScreen = useOnScreen(elementRef);
    let divClass = "inputData";

    if(!isOnScreen){
        divClass = "inputData sticky";
        console.log("Not")
    }else{
        divClass = "inputData"
    }


    return (
        <div className="nav_container">
            <div className="nav" ref={elementRef}>
                <h1>MY Anime List</h1>
            </div>

            <div className= {divClass}>
                <input type="text" placeholder='Title' onChange={(event) => { setnewTitle(event.target.value) }} />
                <input type="number" placeholder='Rate' onChange={(event) => { setnewRate(event.target.value) }} max="10" min="0" id='inputNumber' />
                <button onClick={updateData} className="button">Add</button>
            </div>
        </div>
    )
}

export default Navbar