import { Form } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react'
import { response } from 'express';

export const Login = () => {

  const onFinish =async(values)=>{
    try{
        response = await axios.post("/api/user/login",values);
     if(response.data.success){
      toast.success(response.data.message);
      let token = localStorage.setItem("token", response.data.tokne);
      
      navigate('/users')
     }else{
      toast.error(response.data.message);
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
      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input placeholder="Password" type="password" />
      </Form.Item>
      <button className="primary text-white px-5 my-2 w-100">{'Login'}</button>
     <Link to="/register" className=" text-mini">
        Don't have an account , Click Here To Register
      </Link>
    </Form>
  </div>
  )
}
