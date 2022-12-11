import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { isEmpty } from "lodash";
import { Table,Popconfirm, Button, Space } from 'antd';
import { DefaultLayout } from '../components/DefaultLayout';

export const Billing = () => {

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setGridData(response.data);
    setLoading(false);
  };
  
  // Add age in the dataBase
  const dataWithAge = gridData.map((item) => ({
    ...item,
    age: Math.floor(Math.random() * 6) + 20,
  }));

  // Rename body as message in dataBase
  const modifiedData = dataWithAge.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    message: isEmpty(body) ? item.message : body,
  }));

  const handleDelete = (value) => {
    const dataSource = [...modifiedData];
    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setGridData(filteredData);
  };
  

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
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
      title: "Age",
      dataIndex: "age",
      align: "center",
     
    },
    {
      title: "Message",
      dataIndex: "message",
      align: "center",
      
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) =>{
        //const editable = isEditing(record);
       return modifiedData.length >= 1 ? (
          <Space>
            <Popconfirm
              title="Are you sure want to delete?"
              onConfirm={() => handleDelete(record)}
            >
              <Button danger type="primary">
                Delete
              </Button>
            </Popconfirm>
            
          </Space>
        ) : null;
      }
    },
  ];
  return (
    <DefaultLayout>
      <div>
        <Table
        dataSource={modifiedData}
        columns={columns}
        bordered
        loading={loading}
      />
    </div>

    </DefaultLayout>
    
  )
}
