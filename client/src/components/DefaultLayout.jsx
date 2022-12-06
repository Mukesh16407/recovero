import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const DefaultLayout = (props) => {
   
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
            <h1 className="text-white">
              {" "}
              <b className="secondary-text">R</b> ecovero {" "}
            </h1>
             <div>
             <h1 className="text-white text-small">{user?.name}</h1>
             <h1
                className="text-white text-small cursor-pointer underline"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </h1>
             </div>
            </div>
            <div className="content">{props.children}</div>
        </div>
      )
}