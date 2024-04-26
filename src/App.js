import logo from './logo.svg';
import './App.css';
import Tasklist from './components/Tasklist';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar';
import CreateTask from './components/CreateTask';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './PrivateRoutes';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import MyTask from './components/MyTask';
import Users from './components/Users';
import AdminTask from './components/admin/AdminTask';

function App() {
  return (
    <div className="container">

      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route  element={<PrivateRoutes/>}>
             <Route path="/" element={<Dashboard/>}>
              <Route path="/" element={<Tasklist />}></Route>
              <Route path="mytask" element={<MyTask />}></Route>
              <Route path="admintask" element={<AdminTask />}></Route>
              <Route path="create" element={<CreateTask />} ></Route>
              <Route path="/users" element={<Users/>} ></Route>
              <Route path="profile" element={< Profile />} ></Route>
              <Route path="ChangePassword" element={< ChangePassword />} ></Route>
            </Route>
          </Route>
        </Routes>
  </BrowserRouter>
    </div>
  );
}
export default App;
