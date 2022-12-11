import { Table, Row, Col,Popconfirm, Button, Space } from 'antd';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DefaultLayout } from '../components/DefaultLayout';
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
    },[]);

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        align: "center",
        
      },
      {
        title: "Email",
        dataIndex: "email",
        align: "center",
        
      },
      {
        title: "Action",
        dataIndex: "action",
        align: "center",
        render: (text, record) =>{
          //const editable = isEditing(record);
         return userData.length >= 1 ? (
            <Space>
              <Popconfirm
                title="Are you sure want to delete?"
                onConfirm={() => deleteMember(record)}
              >
                <Button danger type="primary">
                  Delete
                </Button>
              </Popconfirm>
              
              
            </Space>
          ) : null;
        }
      },
    ]
  return (
    <DefaultLayout>
      <div>
    <div className="d-flex justify-content-between align-items-center my-3">
            <input 
             type="text"
             className="w-300 px-2"
             placeholder="search members"/>
             <button
          className="primary text-white px-3"
          onClick={() => {
            navigate("/add-member");
          }}
        >
          Add Member
        </button>

        </div>
        
  </div>
      <Table columns={columns} dataSource={userData}/>
    </DefaultLayout>
  
  )
}
