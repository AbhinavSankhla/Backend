import React, { useEffect, useState } from 'react'
import Footer from '../Common/Footer'
import HeaderTwo from '../Common/HeaderTwo'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 

function Register() {
    const nav = useNavigate();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [ifOtp, setIfOtp] = useState(false);
    const [userApproved, setuserApproved] = useState(false);
    const [otpBtn, setOtpBtn] = useState(false);
    const [btnText, setBtnText] = useState('Genrate OTP');
    

    // const main = ()=>{
        // console.log('first')

    // //    regular expression
    // const pattern = /^[a-z ,.'-]+$/i  //i = case insensitive(capital & small does'nt matter)

    // console.log(pattern.test('gagan'))
    // };

    // useEffect(()=>{main()},[]);


    //Delete user login Cookie in 10 min
    //inspect->application->refresh
    // useEffect(()=>{
    //     const currentDate = new Date();

    //     const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds() + 10}`;

    //     const newDate = new Date(currentDate.toDateString() + ' ' + time);

    //     console.log(newDate);

    //     Cookies.set('tmp', 'gagan', {expires: newDate});
    // },[]);

    const formValidation = ()=>{

        const newArr = {};
        //check email
        const emailPattren = /^[^@]+@[^@]+\.[^@]+$/;

        const ifEmail = emailPattren.test(data.email);

        if(!ifEmail) {
            newArr.email = 'Please enter valid email';
        }
        
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$/;
        const ifPassword = passwordPattern.test(data.password);

        if(!ifPassword) {
            newArr.password = 'Please include at least one lower case, one upper case, special charactor, minimum length 8 and maximum 14';
        }

        const ifCpassword = data.password === data.cpassword;

        if(!ifCpassword) {
            newArr.cpassword = 'password and confirm password does not match'
        }

        setErrors(newArr);

        const keysLength = Object.keys(newArr).length;  //return keys inside of arrays.
        if(keysLength === 0){
            return true;
        }
        else{
            return false;
        }
    };

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const ifFormValid = formValidation();
        
        if(!ifFormValid){
            setTimeout(()=>{setErrors({})},4000); //blank error obj after 4 sec
            return;
        }

        if(!userApproved) return alert('please accept terms and condition');

        console.log(data);

        try{
            const response = await axios.post('http://localhost:5200/user/register_user',data);

            // console.log(response.data);

            if(response.status !== 200) return alert('something went wrong');
            if(response.status === 400) return alert(response.data.data.message);

            //set user data in cookie (user loggined till 7 days)
            //user-data (keyname) 
            Cookies.set('user-data', response.data.data, {expires: 7});

            alert('User registered successfully');
            
            // console.log(response);
            nav('/');
        }
        catch(error){
            console.log(error);
            alert('something went wrong');
        }
//abc!123ABC098
    };



    const handleOtpGen = async()=>{
        setIfOtp(true);
        setOtpBtn(true);

        let counter = 30;
        setBtnText(`Resend OTP in ${counter}s`);
        counter--;

        const otpInterval = setInterval(()=>{
            setBtnText(`Resend OTP in ${counter}s`);
            
            if(counter < 1){
                clearInterval(otpInterval);
                setBtnText('Genrate OTP');
                setOtpBtn(false);
            }
            counter--;
        }, 1000);

        try{
            const response = await axios.post('http://localhost:5200/otp/generate_otp',{email : data.email});

            if(response.status !== 200) return alert('something went wrong');
            // console.log(response.data);
        }
        catch(error){
            console.log(error);
            alert('something went wrong');
        }
    }
    
  return (
   <>
    <HeaderTwo/>
        <section class=" ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleFormSubmit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e)=>{setData({...data, email:e.target.value})}}/>
                      {/* condition to remove span */}
                      {errors.email && <span className='text-[red]'>{errors.email}</span>}
                  </div>
                  <div>
                  <button type="button" disabled={otpBtn} onClick={handleOtpGen} class="w-full font-medium bg-gray-300 rounded-lg text-sm px-5 py-2.5 text-center ">{btnText}</button>
                  </div>
                  <div className={`${ifOtp ? 'block' : 'hidden'}`}>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>{setData({...data, password:e.target.value})}}/>
                      {errors.password && <span className='text-[red]'>{errors.password}</span>}
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="cpassword" id="cpassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setData({...data, cpassword:e.target.value})}} required=""/>
                      {errors.cpassword && <span className='text-[red]'>{errors.cpassword}</span>}
                  </div>
                  <div>
                      <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                      <input type="otp" name="otp" id="otp" placeholder="Enter OTP" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setData({...data, otp:e.target.value})}} required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" checked={userApproved} onChange={(e) => {setuserApproved(e.target.checked)}} type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">I accept the Terms and Conditions</label>
                          </div>
                      </div>
                  </div>
                  <button type="submit" class="w-full font-medium bg-gray-300 rounded-lg text-sm px-5 py-2.5 text-center ">Create An Account</button>
                  </div>
                  <p class="text-sm font-light text-gray-300 dark:text-gray-300">
                  Already have an account? <Link to={'/login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
<Footer/>
   </>
  )
}
export default Register
//exec
//test
//match
//replace