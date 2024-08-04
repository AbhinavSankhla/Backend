import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Viewcourse() {
  const nav = useNavigate();

  let {changemenu} = useContext(mainContext);

  const [courseData, setcourseData] = useState([]);
  const [filePath, setfilePath] = useState('');
  const [checked, setChecked] = useState([]);

  // console.log(checked);
  // console.log(courseData)

  const handleFetchCourse = async() => {
    try{
      const response = await axios.get('http://localhost:5200/course/read_courses');

      if(response.status !== 200) return alert('Something went wrong');

      // console.log(response.data.filePath);
      setfilePath(response.data.filePath);

      setcourseData(response.data.data);

    }
    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }
  useEffect(() => {handleFetchCourse()},[])


   const handleStatus = async (e) => {
    const statusData = {
      id: e.target.value,
      status: (e.target.textContent === 'Active') ? false : true
    }

    const response = await axios.put('http://localhost:5200/course/change_course_status', statusData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    handleFetchCourse(); //calling function to live change button.
   };  

   //redirect to addCourse page with id(as param).
   const handleUpdate = (e) => {
    nav(`/addcourse/${e.target.value}`);
   }

   const handleDelete = async(e) => {

     //false case mai api call nhi hogi
    if(!window.confirm('Are you sure to delete data?')) return; 

    // const abc = window.confirm('Are you sure to delete data?');
    // console.log(abc);


    // console.log(e.target.value);  //check whether fn work or not
    try{
      const response = await axios.delete(`http://localhost:5200/course/delete_single_course/${e.target.value}`);
      console.log(response);

      if(response.status !== 200) return alert('something went wrong');
      alert('course deleted successfully');
      handleFetchCourse();

    }catch(error){
      console.log(error);
      alert('something went wrong');
    }

   }

   const handleCheckInput = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked); //return true or false when checkbox checked.

    if (e.target.checked) {
      const newArr = [...checked, e.target.value];
        //  console.log(newArr);
      setChecked(newArr);
    }
    else{
      const newArr = [...checked];
      const currentIndex = newArr.findIndex((item)=> item === e.target.value);
      newArr.splice(currentIndex, 1);
      setChecked(newArr);
    }
    }
    

    const handleMultiDelete = async()=>{
      // console.log(checked);
      if (!window.confirm('Are you sure to delete')) return;
      try{
        const response = await axios.delete('http://localhost:5200/course/multi_delete',{data: checked},{
          headers : {
            'Content-Type' : 'application/json'  //optional (headers:{})
          }
        });
        // console.log(response);
        if(response.status !==200) return alert('something went wrong'); 
        handleFetchCourse();
      }
      catch(error){
        alert('something went wrong');
      }

    }



  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Course Table
        </h1>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <table >
            <tr>
              <th>S.no</th>
              <th>
                <input type="checkbox"/>
                <button className='bg-[red] p-[6px_10px] rounded' onClick={handleMultiDelete}>Delete</button>
              </th>
              <th>Course Name</th>
              <th>Fees</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {
            courseData.map((v,i) => {
              return(
                <tr>
                  <td>{i+1}</td>
                  <td><input type="checkbox" onClick={handleCheckInput} value={v._id}/></td>
                  <td>{v.coursename}</td> 
                  <td>{v.courseprice}</td>
                  <td>{v.courseduration}</td>
                  <td>{v.coursedes}</td>
                  <td>
                     <img src={filePath + v.thumbnail} className='w-[100px]' />
                  </td>
                  <td>
                    <button value={v._id} onClick={handleStatus} className={`p-[4px_8px] text-white rounded ${((v.status) ? 'bg-green-500' : 'bg-red-500')}`}>{(v.status) ? 'Active' : 'Inactive'}</button>
                  </td>
                  <td className='text-center'>
                    <button value={v._id} onClick={handleUpdate} className='bg-green-500 text-white px-5 mr-5 py-1'>Edit</button>
                    <button value={v._id} onClick={handleDelete} className='bg-red-500 text-white px-5 py-1'>Delete</button>
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

export default Viewcourse