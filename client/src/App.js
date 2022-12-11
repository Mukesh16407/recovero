import { Route, Routes } from "react-router-dom";
import React from "react";
import "./styles/theme.css";
import "./styles/layout.css";
import { Toaster } from "react-hot-toast";
import Spinner from './components/spinner'
import { useSelector } from "react-redux";
import { PublicRoute } from "./components/PublicRoute";
import {Dashboard} from './pages/Dashboard';
import {Login} from './pages/Login';
import {SignUp} from './pages/SignUp';
import {Users} from  './pages/Users';
import {Billing} from './pages/Biling'
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading ? <Spinner /> : null}
       <Toaster />
      
       <Routes>
       <Route path="/" element={<Dashboard/>}/>
       <Route path="/login" element={  <PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={  <SignUp isSignup={true}/>}/>
        <Route path="/billing"  element={ <Billing/> }/>
        <Route path="/add-member"  element={  <SignUp/>}/>
        <Route path="/allusers"  element={ <Users/>}/>
       </Routes>
     
    </div>
  );
}

export default App;
