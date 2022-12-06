import { Route, Routes } from "react-router-dom";
import React from "react";
import "./styles/theme.css";
import "./styles/layout.css";
import { Toaster } from "react-hot-toast";
import Spinner from './components/spinner'
import { useSelector } from "react-redux";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {Dashboard} from './pages/Dashboard';
import {Login} from './pages/Login';
import {SignUp} from './pages/SignUp';
import {Users} from  './pages/Users'
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading ? <Spinner /> : null}
       <Toaster />
      
       <Routes>
       <Route path="/" element={<Dashboard/>}/>
       <Route path="/login" element={  <PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={  <PublicRoute><SignUp isSignup={true}/></PublicRoute>}/>
        <Route path="/add-member"  element={  <PublicRoute><SignUp/></PublicRoute>}/>
        <Route path="/allusers"  element={  <PublicRoute><Users/></PublicRoute>}/>
       </Routes>
     
    </div>
  );
}

export default App;
