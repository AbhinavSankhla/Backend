import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import logo from '../img/logo (1).svg';

import { Link, useNavigate } from 'react-router-dom';
function Login() {

  const nav = useNavigate();  //redirect to dashboard

  const [admindata, setAdmindata] = useState({});

  const handleLogIn = async()=>{

    // console.log(admindata);

    const response = await fetch('http://localhost:5200/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(admindata)
    });


    if(response.status === 200){
      const data = await response.json();

      console.log(data);

      nav('/dashboard');
    }

    else{
      alert("Invalid Credentials");
    }

  };


  return (
   
    <div className='bg-[#F5F7FF] w-full h-[100vh] flex justify-center items-center'>
        <div className='w-[500px]  bg-white px-[50px] py-[50px] '>
            <img src={logo} alt="" width={180} className='mb-5' />
            <h3 className='text-black text-[16px] font-[400]'>Sign in to continue.</h3>
        <form action="">
            <input type="text" name='mail' onChange={(e)=>{setAdmindata({...admindata, mail:e.target.value})}} className=' mt-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Mail'  />
            <input type="text" name='password'  onChange={(e)=>{setAdmindata({...admindata, password:e.target.value})}} className=' mt-6 mb-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Password'  />

            <Link><input type="button" onClick={handleLogIn} value='Login' className='w-full bg-[#4B49AC] text-center text-[30px] text-white py-5 rounded-[18px] font-[arial] font-[400]' /></Link>
        <div className='flex items-center mt-4 justify-between mb-4'>
            <div className='flex items-center text-[gray] font-sans'> <input type="checkbox" className='mr-3 w-[17px] h-[17px]  appearance-none outline outline-2 outline-blue-700' />Keep me signed in</div>
            <div className='flex items-center text-[black] font-sans'>
            Forgot password? </div>
        </div>
        </form>
        </div>
    </div>
    
  )
}

export default Login