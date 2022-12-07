import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';

export const Dashboard = () => {

  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  const getMembers =async(values)=>{
    
    try{
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/allusers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setMembers(response.data.data);
      } else {
        toast.error(response.data.message);
      }

    }catch(error){
      dispatch(hideLoading());
      toast.error(error.message);

    }
  }
  useEffect(() => {
    if (members.length === 0) {
      getMembers();
    }
  }, []);
  return (
    <div className="p-5">
      <div className="header d-flex justify-content-between align-items-center py-3">
      <h1 className="text-white">
          
          <b className="secondary-text">R</b>ecovero 
        </h1>
        <div>
        <h1
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </h1>
        </div>
        </div>
        {members.length >0 ?(
          <Row  gutter={[20, 20]}>
             <Col span={24}>
             <h1 className="text-large my-3">Welcome to Dashbord </h1>
             <hr />
             </Col>
             {members.map((member)=>{
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
