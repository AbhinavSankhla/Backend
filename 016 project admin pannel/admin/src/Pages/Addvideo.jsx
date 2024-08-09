import React, { useContext, useState, useEffect } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import prev from '../img/generic-image-file-icon-hi.png'
import { useNavigate, useParams } from 'react-router';

function Addvideo() {
  const nav = useNavigate();
  const param = useParams();

  const fetchData = async(id) =>{
    const res = await axios.get(`http://localhost:5200/videos/fetch_video_with_id/${id}`);
    console.log(res.data);
  }

  if(param._id){
    console.log(param._id)
    fetchData(param._id);
  }

  let {changemenu} = useContext(mainContext);
  const [courseData, setcourseData] = useState([]);
  const [data, setdata] = useState({});

  

  const handleFetchCourse = async() => {
    try{
      const response = await axios.get('http://localhost:5200/course/true_courses');

      if(response.status !== 200) return alert('Something went wrong');

      // console.log(response.data.filePath);
      // setfilePath(response.data.filePath);
      setcourseData(response.data.data);

      //fetch path
      console.log(response.status);
    }

    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }

  useEffect(() => {handleFetchCourse()},[]);

  const handleAddVideo = async(e) =>{
    e.preventDefault();
    console.log(data);

    try{
      const response = await axios.post('http://localhost:5200/videos/add_video', data);

      if(response.status !== 200) return alert('Something went wrong');

      alert('data inserted successfully');
      nav('/viewvideo');      
    }

    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }

  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Video
        </h1>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <form action="" onSubmit={handleAddVideo}>
            Course Category
                                                              {/* destructure, key:value*/}
            <select name="coursecat" onChange={(e)=>{setdata({...data, coursecat:e.target.value})}} id="" className='w-full border my-3 border-gray-400 h-[50px]'>           
              {
                courseData.map((item, index) => (
                  <option value={item._id} className=''>{item.coursename}</option>
                ))
              }
            </select>
            Video Topic
            <input type="text" name="videotopic" onChange={(e)=>{setdata({...data, videotopic:e.target.value})}}  className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 '  />
            Video Link
            <input type="text" name="videourl" onChange={(e)=>{setdata({...data, videourl:e.target.value})}} className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4'  />
           
            Video Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input type="radio" name='status' value={true} onChange={(e)=>{setdata({...data, status:e.target.value})}} className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Active
            <input type="radio" name='status' value={false} onChange={(e)=>{setdata({...data, status:e.target.value})}} className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Deactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer/>
      </div>
    </div>
    </div>
  )
}

export default Addvideo