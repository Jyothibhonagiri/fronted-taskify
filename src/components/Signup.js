import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
    const [userAuth, setUserAuth] = useState({ email: "", fullname: "", password: "", repassword: "",role:"" })
    const [error,setError] =useState({})
    const [iserror,setIserror] = useState(false)
     const [errormessage,setErrormessage] = useState("")
     const [roles,setRoles] = useState(["admin","user"])
     const [selectedRole,setSelectedRole] = useState("")
    const Navigate = useNavigate()
    const onfieldchange = (e) => {
        console.log(e.target.name,e.target.value)
        setUserAuth((PrevState) => {
            return {
                ...PrevState,
                [e.target.name]:e.target.value
            }
        }
        ) 
    }
   const validateformfields = () => {
    let error={}
  if(!userAuth.fullname){
     error.fullname="please enter fullname"
  } if(!userAuth.email){
         error.email="please enter email"
  } if(!userAuth.password){
    error.password="please enter password"
  } if(!userAuth.repassword){
    error.repassword="please enter repassword"
  }
 else if( userAuth.password != userAuth.repassword){
    error.repassword = "your password doesn't match"
  }
   return error
  }
  const signup=()=>{
    console.log(userAuth)
       fetch("http://localhost:7000/auth/signup",{method:"POST",headers:{"content-type":"application/json"}, body:JSON.stringify(userAuth)} ).then((res)=>{
        return res.json();
       }).then((result)=>{
         if(result.success){
            Navigate("/login")
         }else{
            setIserror(true)
            setErrormessage(result.message)
         }
       })
  }
   
    const register=(e)=>{
       e.preventDefault();
      let error = validateformfields()
      setError(error)
      if(Object.keys(error).length===0){
         signup();
      }else{
     return;
      } 
    }

    const onchangeRole=(e)=>{
     console.log(e.target.value)
     setSelectedRole(e.target.value)
     setUserAuth((PrevState) => {
        return {
            ...PrevState,
            role:e.target.value
        }
    }
     )
    }
return (
    <div className="container">
        <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="col-md-4">
                <div className="card mt-4" >
                    <div className="card-body">
                        <h4 className="text-center">Signup</h4>
                        <form onSubmit={register}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={userAuth.name} onChange={onfieldchange} name="fullname" />
                            </div>
                            <p style={{color:"red"}}>{error?.fullname}</p>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" value={userAuth.email} onChange={onfieldchange} name="email" />
                            </div>
                            <p style={{color:"red"}} >{error?.email}</p>
                            <div className="mb-3">
                                <label className="form-label">password</label>
                                <input type="password" className="form-control" value={userAuth.password} onChange={onfieldchange} name="password" />
                            </div>
                            <p style={{color:"red"}}>{error?.password}</p>
                            <div className="mb-3">
                                <label className="form-label">Re-enter password</label>
                                <input type="password" className="form-control" value={userAuth.repassword} onChange={onfieldchange} name="repassword" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select className="form-select" onChange={(e) => onchangeRole(e)}>
                                    <option selected disabled value={"select Role"}>{"select Role"}</option>
                            {roles.map((role) => {
                                return (
                                    <option value={role}>{role}</option>
                                )
                            })}

                        </select>
                            </div>
                            <div className="mb-3">
                              <Link to="/login"> Already has an account please go to login </Link>
                            </div>
                            <p style={{color:"red"}}>{error?.repassword}</p>
                            <input type="submit" className="btn btn-primary w-100" value="signup" />
                            {iserror && <div className="mb-3">
                                <h4 style={{color:"red"}}>{errormessage}</h4>
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
export default Signup