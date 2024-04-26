
import { Navigate,Outlet } from "react-router-dom";

function PrivateRoutes(){
    const  isloggedin = localStorage.getItem("isloggedin");
    return(
       isloggedin ? <Outlet/>:<Navigate to="login"/>
    )
}
export default PrivateRoutes