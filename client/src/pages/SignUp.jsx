import React from "react";
import {  Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";

export const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish =async(values)=>{
    try{
      dispatch(showLoading())
     const response = await axios.post("/api/user/register",values);
     dispatch(hideLoading())
     if(response.data.success){
      toast.success(response.data.message);
      navigate('/login')
     }else{
      toast.error(response.data.message)
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
        <button className="primary text-white px-5 my-2 w-100">REGISTER</button>
        <Link to="/login" className=" text-mini">
          Already Registered , Click Here To Login
        </Link>
      </Form>
    </div>
  );
};
