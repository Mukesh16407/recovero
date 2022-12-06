import { Route, Routes } from "react-router-dom";
import "./styles/theme.css";
import "./styles/layout.css";
import { Toaster } from "react-hot-toast";
import Spinner from './components/spinner'
import { useSelector } from "react-redux";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {Dashboard} from './pages/Dashboard';
import {Login} from './pages/Login';
import {SignUp} from './pages/SignUp'
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      {loading ? <Spinner /> : null}
       <Toaster />
      
       <Routes>
       <Route path="/" element={<Dashboard/>}/>
       <Route path="/login" element={  <PublicRoute><Login/></PublicRoute>}/>
        <Route path="/signup" element={  <PublicRoute><SignUp/></PublicRoute>}/>
       </Routes>
     
    </div>
  );
}

export default App;
