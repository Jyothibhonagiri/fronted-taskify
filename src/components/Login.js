import { useState } from "react"
import { Navigate, json, useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [iserror, setIserror] = useState(false)
    const [errormessage, setErrormessage] = useState("")
    const [error,setError] = useState({})
    const Navigate = useNavigate();
    const onemailchange = (e) => {
        setEmail(e.target.value)
    }
    const onpasswordchange = (e) => {
        setPassword(e.target.value)
    }
     const validateloginform=()=>{
        let error={};
        if(!email){
            error.email="please enter email"
        }if(!password){
            error.password="please enter password"
        }
        return error;
     }
    const login = (e) => {
        e.preventDefault();
        let error = validateloginform()
        setError(error)
        if(Object.keys(error).length===0){
            fetch("http://localhost:7000/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body:JSON.stringify({email, password}) }).then((res) => {
            return res.json();
        }).then((result) => {
            if (result.success) {
                localStorage.setItem("loggedinuser",JSON.stringify({email:result.email, userId:result. userId,role:result.role}))
                localStorage.setItem("isloggedin",true)
                Navigate("/")
            } else {
                setIserror(true)
                setErrormessage(result.message)
                
            }
        })
        }else{
            return;
        }
    }
    return (
        <div className="d-flex" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="col-md-4">
                <div className="card mt-4" >
                    <div className="card-body">
                        <h4 className="text-center">login</h4>
                        <form onSubmit={login}>
                            <div className="mb-3">
                                <label class="form-label">Email</label>
                                <input type="text" className="form-control" value={email} onChange={onemailchange} />
                            </div>
                            <p style={{color:"red"}} >{error?.email}</p>
                            <div className="mb-3">
                                <label class="form-label">password</label>
                                <input type="password" className="form-control" value={password} onChange={onpasswordchange} />
                            </div>
                            <p style={{color:"red"}} >{error?.password}</p>
                            <input type="submit" className="btn btn-primary w-100" value="login" />
                        </form>
                       {iserror && <div className="mb-3">
                            <h4 style={{color:"red"}}>{errormessage}</h4>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login