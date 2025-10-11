import React from 'react';
import { Link, } from 'react-router';
import '../../index.css'
import errorImg from "../../assets/original-ab1bde6f9c74de5c8961f7fe84990cd4.gif"
const Error = () => {
  
    return (<>

         
        
        <div className='bg-white '>
           
            <div className="h-svh">
  <div className="flex justify-center items-center text-center">
    <div className="">
     <img  className='text-center h-[600px]' src={errorImg} alt="" />
      <Link to="/" className="bg-[#176AE5] text-white px-8 py-4 rounded-2xl border hover:border-[#176AE5] hover:bg-white hover:text-[#176AE5] text-2xl transition">Go Home</Link>
    </div>
  </div>
</div>
            
        </div>
        </>
    );
};

export default Error;