import {  Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";
import React from "react";


export const SignUp = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const onFinish =async(values)=>{
    try{
      dispatch(showLoading())
      let payload = JSON.parse(JSON.stringify(values));
      let isAdmin = false;
      let resp = null;
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGY3NDQ3Mzg5N2EwOTA2MmQwYmIwNyIsImlhdCI6MTY3MDM1MDE0OCwiZXhwIjoxNjcwNDM2NTQ4fQ.kDPVIViS4lVGv21tn3io_6g2oL3y86K7qCd3Jwqq1F4'
      if(props.isSignup){
        isAdmin = true;
        resp = await axios.post("/api/user/register",{...payload, isAdmin});
      }else{
        const token = localStorage.getItem("token");
        resp = await axios.post("/api/user/add-member",{...payload, isAdmin}, { headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'}});
      }
      
     dispatch(hideLoading())
     if(resp.data.success){
      toast.success(resp.data.message);
      navigate('/login')
     }else{
      toast.error(resp.data.message)
     }
    }catch(err){
      dispatch(hideLoading())
      toast.error("something went wrong")
    }
  }

  return (
    <div className="primary d-flex align-items-center justify-content-center h-screen">
      <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
        <h1 className="text-medium ">
          <b>RECOVERO</b>
        </h1>
        <Form.Item label="Name" name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <button className="primary text-white px-5 my-2 w-100">{props.isSignup ?  'REGISTER' : 'ADD MEMBER'}</button>
       {props.isSignup && <Link to="/login" className=" text-mini">
          Already Registered , Click Here To Login
        </Link>
        }
      </Form>
    </div>
  );
};
