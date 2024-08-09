import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Viewvideo() {
  const nav = useNavigate();
  
  let {changemenu} = useContext(mainContext);

  const [videoData, setvideoData] = useState([]);
  const [checked, setChecked] = useState([]);

  // console.log(checked);
  // console.log(videoData);


  const handleFetchVideo = async() => {
    try{
      const response = await axios.get('http://localhost:5200/videos/read_video');

      if(response.status !== 200) return alert('Something went wrong');

      const data = response.data.data;
      // console.log(data)
      setvideoData(data);

      // console.log(response.data.filePath);
      // setfilePath(response.data.filePath);

      // setvideoData(response.data.data);

    }
    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }

  useEffect(() => {handleFetchVideo()},[])
  

  const handleStatus = async(e) =>{
    const statusData = {  
      id: e.target.value,
      status: (e.target.textContent === 'Active') ? false : true
    }
    // console.log(statusData);
    const response = await axios.put('http://localhost:5200/videos/change_video_status', statusData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    handleFetchVideo(); //calling function to live change button.
  }

  const handleUpdate = (e) =>{
    nav(`/addvideo/${e.target.value}`)
  };

  const handleDelete = async(e) =>{
    // console.log(e.target.value);
    if(!window.confirm('Are you sure to delete data?')) return;

    try{
      const response = await axios.delete(`http://localhost:5200/videos/delete_single_video/${e.target.value}`);
      console.log(response);

      if(response.status !== 200) return alert('something went wrong');
      alert('course deleted successfully');
      handleFetchVideo();
    }

    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }

  const handleCheckInput = (e) =>{
    // console.log(e.target.value);
    // console.log(e.target.checked);

    if(e.target.checked){
      const newArr = [...checked, e.target.value];
      setChecked(newArr);
      // console.log(newArr);
    }
    else{
      const newArr = [...checked];
      const currentIndex = newArr.findIndex((item)=> item === e.target.value);
      newArr.splice(currentIndex, 1);
      setChecked(newArr);
    }
  }

  const handleMultiDelete = async() =>{
    
    if(!window.confirm('Are you sure to delete data?')) return; 
    try{
      const response = await axios.delete('http://localhost:5200/videos/multi_delete_video', {data: checked},{
        headers : {
          'Content-Type' : 'application/json' 
        }
      });
  
      if(response.status !==200) return alert('something went wrong'); 
      handleFetchVideo();
    }
    catch{
      alert('something went wrong');
    }
  };

  const handleSearch = async(e) =>{
    // console.log(e.target.value)
    if(!e.target.value) return handleFetchVideo();
    try{
      const response = await axios.get(`http://localhost:5200/videos/search_video/${e.target.value}`);
      if(response.status !== 200) return alert('Something went wrong');
      setvideoData(response.data.data)
    }
    catch(error){
      alert('Something went wrong');
    }
  }; 

  return (
  <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Welcome To Admin Panel
        </h1>
        <input type="text" placeholder="search" className='w-full border border-black p-[10px_20px]' onChange={handleSearch}/>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <table >
            <tr>
              <th>S.no</th>
              <th>
                <input type="checkbox"/>
                <button onClick={handleMultiDelete} className='bg-[red] p-[6px_10px] rounded' >Delete</button>
              </th>
              <th>Course Name</th>
              <th>Video Topic</th>
              <th>Video </th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {
              videoData.map((v,i) => {
                return(
                  <tr>
                    <td>{i+1}</td>
                    <td><input type="checkbox"  onClick={handleCheckInput} value={v._id}/></td>
                    <td>df</td>
                    <td>{v.videotopic}</td>
                    <td>{v.videourl}</td>
                    <td>
                    <button value={v._id} onClick={handleStatus} className={`p-[4px_8px] text-white rounded ${((v.status) ? 'bg-green-500' : 'bg-red-500')}`}>{(v.status) ? 'Active' : 'Inactive'}</button>
                    </td>
                    <td className='text-center'>
                    <button value={v._id} onClick={handleUpdate} className='bg-green-500 text-white px-5 mr-5 py-1'>Edit</button>
                    <button value={v._id} onClick={handleDelete} className='bg-red-400 text-white px-5 py-1'>Delete</button>
                    </td>
                </tr>
                )
              })
            }
          </table>
        </div>
        </div>
      <Footer/>
      </div>
    </div>
    </div>
  )
}

export default Viewvideo;