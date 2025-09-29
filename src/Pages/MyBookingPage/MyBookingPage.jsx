import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const MyBookingPage = () => {
    const {user}= useContext(AuthContext)
    const [myBookingPage ,setMyBookingPage]= useState()

    useEffect(()=>{
        axios.get(`http://localhost:5000/rooms/68d451198f98c153b4d01dbc`)
        .then(res=>(setMyBookingPage(res.data)))
        .catch(err=>console.log(err))

    },[])

    // ax
    return (
        <div>
           <h1>11111    </h1>
        </div>
    );
};

export default MyBookingPage;