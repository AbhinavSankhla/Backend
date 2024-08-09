import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Viewteam() {
  const nav = useNavigate();
  let {changemenu} = useContext(mainContext);

  const [teamData, setTeamData] = useState([]);
  const [filePath, setfilePath] = useState('');
  const [checked, setChecked] = useState([]);

  // console.log(teamData);

  const handleFetchTeam = async() => {
    try{
      const response = await axios.get('http://localhost:5200/team/read_team');

      if(response.status !== 200) return alert('Something went wrong');

      console.log(response.data.filePath);
      setfilePath(response.data.filePath);

      setTeamData(response.data.data);

    }
    catch(error){
      console.log(error);
      alert('something went wrong');
    }
  }
  useEffect(() => {handleFetchTeam()},[])

  const handleStatus = async(e) =>{
    const statusData = {  
      id: e.target.value,
      status: (e.target.textContent === 'Active') ? false : true
    }
    // console.log(statusData);
    const response = await axios.put('http://localhost:5200/team/change_status', statusData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    handleFetchTeam();
  }

  const handleUpdate = (e) => {
    nav(`/addteam/${e.target.value}`);
  }

  const handleDelete = async(e) =>{
    // console.log(e.target.value);
    if(!window.confirm('Are you sure to delete data?')) return;

    try{
      const response = await axios.delete(`http://localhost:5200/team/delete_single_member/${e.target.value}`);
      console.log(response);

      if(response.status !== 200) return alert('something went wrong');
      alert('course deleted successfully');
      handleFetchTeam();
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
      const response = await axios.delete('http://localhost:5200/team/delete_multiple_member', {data: checked},{
        headers : {
          'Content-Type' : 'application/json' 
        }
      });
  
      if(response.status !==200) return alert('something went wrong'); 
      handleFetchTeam();
    }
    catch{
      alert('something went wrong');
    }

  };

  const handleSearch = async(e) =>{
    // console.log(e.target.value)
    if(!e.target.value) return handleFetchTeam();
    try{
      const response = await axios.get(`http://localhost:5200/team/search_team_member/${e.target.value}`);
      if(response.status !== 200) return alert('Something went wrong');
      setTeamData(response.data.data)
      
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
        Team Table
        </h1>
        <input type="text" placeholder="search" className='w-full border border-black p-[10px_20px]' onChange={handleSearch}/>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <table >
            <tr>
              <th>S.no</th>
              <th>
                <input type="checkbox"/>
                <button onClick={handleMultiDelete} className='bg-[red] p-[6px_10px] rounded'>Delete</button>
              </th>
              <th>Member Name</th>
              <th>Category</th>
              <th>Member Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

            {
            teamData.map((v,i) => {
              return(
                <tr>
                  <td>{i+1}</td>
                  <td><input type="checkbox" onClick={handleCheckInput} value={v._id}/></td>
                  <td>{v.memberName}</td> 
                  <td>{v.memberCat}</td>
                  <td>
                     <img src={filePath + v.thumbnail} className='w-[100px]' />
                  </td>
                  <td>
                    <button value={v._id} onClick={handleStatus} className={`p-[4px_8px] text-white rounded ${((v.status) ? 'bg-green-500' : 'bg-red-500')}`}>{(v.status) ? 'Active' : 'Inactive'}</button>
                  </td>
                  <td className='text-center'>
                    <button value={v._id} onClick={handleUpdate} className='bg-green-500 text-white px-5 mr-5 py-1'>Edit</button>
                    <button value={v._id} onClick={handleDelete}   className='bg-red-500 text-white px-5 py-1'>Delete</button>
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

export default Viewteam