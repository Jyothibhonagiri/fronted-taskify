import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [istoggled, setIstoggled] = useState(false)
  const [user, setUser] = useState(null)
  const Navigate = useNavigate();
  const getuserinfo = async () => {
    const userinfo = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
    setUser(userinfo)
  }
  useEffect(() => {
    getuserinfo();

  }, [])
  const logout = async () => {
    await localStorage.clear();
    Navigate("login")
  }
  const dropdowntoggle = () => {
    setIstoggled(!istoggled)
  }
  return (
    <div>
      <nav className="navbar navbar-expand" style={{ backgroundColor: "lightblue", height: "80px" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Taskify</Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             {user?.role !="admin" && <li className="nav-item mt-3" >
                <Link className="nav-link active" to="/">Tasklist</Link>
              </li>}
              {user?.role != "admin" && <li className="nav-item mt-3" >
                <Link className="nav-link" to="mytask">MyTask</Link>
              </li>}

              {user?.role === "admin" && <li className="nav-item mt-3" >
                <Link className="nav-link" to="create">Create Task</Link>
              </li>}

              {user?.role === "admin" && <li className="nav-item mt-3" >
                <Link className="nav-link" to="/users">Users</Link>
              </li>}

              {user?.role === "admin" && <li className="nav-item mt-3" >
                <Link className="nav-link" to="admintask">AdminTask</Link>
              </li>}
              <li class="nav-item dropdown ">
                <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" onClick={() => dropdowntoggle()}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "slategray" }}></div>
                </Link>
                <ul class="dropdown-menu" typeof="none" style={{}}>
                  <li><Link className="dropdown-item" onClick={() => logout()}>Logout</Link></li>
                  <li><Link className="dropdown-item" to="changepassword">change password </Link></li>
                  <li><Link className="dropdown-item" to="profile">profile</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </div >
  )
}

export default NavBar