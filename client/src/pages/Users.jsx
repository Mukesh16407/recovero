import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export const Users = () => {
    const [userData, setUserData] = useState([]);
    const getdata = async () => {
        let token = localStorage.getItem('token')
        let response = await axios.get('/api/user/allusers',{ headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'}})
        return response.data
    }
    // useEffect(()=>{
    //     let userData = getdata();
    //     setUserData(userData)
    // })
  return (
  <div>
    <div>All Users</div>
    <table>
        {userData.length > 0 && userData.map(user=>{
            return <tr><td>{user.name}</td><td>{user.email}</td></tr>
        })}
    </table>
  </div>
  )
}
