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
              <b className="secondary-text">R</b>ecovero {" "}
            </h1>
             <div>
             <span
            className="text-white text-small cursor-pointer underline"
            onClick={() => {
              navigate("/add-member");
            }}
          >
            Users
          </span>
          <span
            className="text-white text-small cursor-pointer underline m-3"
            onClick={() => {
              navigate("/billing");
            }}
          >
            Billing
          </span>
            
             <span
                className="text-white text-small cursor-pointer underline"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </span>
             </div>
            </div>
            <div className="content">{props.children}</div>
        </div>
      )
}