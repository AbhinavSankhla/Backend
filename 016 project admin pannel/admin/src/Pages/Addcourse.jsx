import React, { useContext, useEffect, useState } from 'react';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import DashboardItems from '../Common/DashboardItems';
import Footer from '../Common/Footer';
import { mainContext } from '../Context';
import prev from '../img/generic-image-file-icon-hi.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

// import AdminForms from '../Common/AdminForms'

function Addcourse() {
  const nav = useNavigate(); //react router
  const params = useParams();
  const [imgPrev, setimgPrev] = useState('');
  const [data, setData] = useState({});
  // console.log(data)

  const fetchData = async(id) =>{
    const res = await axios.get(`http://localhost:5200/course/fetch_course_with_id/${id}`);
    
    const oldData = res.data.data;
    oldData.status = oldData.status.toString();
    
    setData(oldData);
    // console.log(res.data.data);
  };
  
  useEffect(()=>{
    if(params._id){
      //pass id in above function as parameter
      fetchData(params._id);
    }
  },[]);

  let {changemenu} = useContext(mainContext);

  const handleAddCourse = async(e) => {

    e.preventDefault();

    const form = e.target; //it target form(form mill jayega)
    const formData = new FormData(form); //it is constructor //makes form data as a form jo ki JS mai form formate hota hai vese.

    //conditions for update and add course
    //if addCourse url(param) mai id leke aayega then... 
    if(params._id){
      try{
        const response = await axios.put(`http://localhost:5200/course/update_course/${params._id}`,formData);
        // console.log(response);
        if(response.status != 200) return alert('something went wrong');
        nav('/viewcourse');
      }
      catch(error){
        console.log(error);
        alert('something went wrong');
      }
    }
    else{
      try{
        const response = await axios.post('http://localhost:5200/course/add_course',
        formData, {}); //formData- work as body //{} is for extra data like headers

        if(response.status != 200) return alert('something went weong');
        nav('/viewcourse');
      }
      catch(error){
        console.log(error);
        alert('something went wrong');
      }
    }
  };

  

  const handleImgPrev = (e)=>{
    const reader = new FileReader();

    const file = e.target.files[0];

    if(file){
      reader.readAsDataURL(file);
    }

    reader.onload = ()=>{
      // console.log(reader.result)
      setimgPrev(reader.result)
    }
  };

  const handleDataUpdate = (e)=>{
    const olddata = {...data};
    olddata[e.target.name] = e.target.value;
    // console.log(olddata);
    setData(olddata);
  };

  return (
  <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>

      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Courses
        </h1>
        <div className=''>
          <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <form action="" onSubmit={handleAddCourse}>
            Courses Name
            <input type="text" value={data.coursename} onChange={handleDataUpdate} name='coursename' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Price
            <input type="text" value={data.courseprice} onChange={handleDataUpdate} name='courseprice' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Duration
            <input type="text" value={data.courseduration} onChange={handleDataUpdate} name='courseduration' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Description
            <textarea value={data.coursedes} onChange={handleDataUpdate} name="coursedes" id="" className='border px-4 pt-3 border-gray-400 my-2 w-full h-[100px]' cols="30" rows="10"></textarea>

            <input type="file" onChange={handleImgPrev} name='thumbnail' id='file-input' className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
            <div className='flex items-center gap-0 mt-[80px]'>
              <div className='w-full flex items-center'>
            <input type="text" readOnly placeholder='Upload File' className=' px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]' />
            <label id="file-input-label" for="file-input" className='border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]'>Upload</label>
            </div>
            <div className=''>
              <img src={imgPrev || data.thumbnail || prev} alt="" width={150} />
            </div>
            </div>
            Courses Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input type="radio" onClick={handleDataUpdate} checked={data.status == 'true'} value={true} name='status' className='mx-2 w-[20px] h-[20px] text-[20px]'/> Active
            <input type="radio" onClick={handleDataUpdate} checked={data.status =='false'} value={false} name='status' className='mx-2 w-[20px] h-[20px] text-[20px]'/> Inactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer className/>
      </div>
    </div>

    </div>
  )
}

export default Addcourse