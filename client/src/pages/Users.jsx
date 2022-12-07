import { Table, Row, Col } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';

export const Users = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line
    const [userData, setUserData] = useState([]);

    const getdata = async (valus) => {
      try{
        dispatch(showLoading());
        const token = localStorage.getItem('token');
        const response = await axios.get(
          "/api/user/allusers",
          { headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'}},
        )
        dispatch(hideLoading());
        if (response.data.success) {
          setUserData(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      }catch(error){
        dispatch(hideLoading());
        toast.error(error.message);
      }
    }
// eslint-disable-next-line
    const deleteMember = async (id) => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          `/api/users/delete-member/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          getdata();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error(error.message);
      }
    };
    useEffect(()=>{
      getdata();
    },[])
  return (
  <div>
    <div className="d-flex justify-content-between align-items-center my-3">
            <input 
             type="text"
             className="w-300 px-2"
             placeholder="search students"/>
             <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/add-member");
          }}
        >
          Add Member
        </button>

        </div>
        {userData.length >0 ?(
          <Row  gutter={[20, 20]}>
             <Col span={24}>
             <h1 className="text-large my-3">Members list </h1>
             <hr />
             </Col>
             {userData.map((member)=>{
              return(
                <div   className="card p-2 cursor-pointer primary-border"
                onClick={() => {
                  navigate(`/users/${member._id}`);
                }}>
                   <h1 className="text-medium">{member.name}</h1>
                <hr />
                <h1 className="text-small">Class : {member.email}</h1>

              </div>
              )
             })}
          </Row>
        ):(
           <div className="d-flex align-items-center justify-content-center mt-5 pt-5">
          <h1 className="text-medium">No Results Found</h1>
        </div>
        )}
  </div>
  )
}
