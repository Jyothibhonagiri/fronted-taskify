import { useState } from "react"

function ChangePassword(){
    const [currentpassword,setCurrentpassword] = useState("")
    const [newpassword,setNewpassword] = useState("")
    const [confirmnewpassword,setConfirmnewpassword]=useState("")
    const [showAlert,setShowAlert] = useState(false)
    const [error,setError] = useState({})
    const oncurrentpasswordchange=(e)=>{
      setCurrentpassword(e.target.value)
    }
    const onnewpasswordchange=(e)=>{
      setNewpassword(e.target.value)
    }
    const onConfirmnewpasswordchange=(e)=>{
       setConfirmnewpassword(e.target.value)
    }
    const validatefield=()=>{
        let error ={};
        if(!currentpassword){
            error.currentpassword ="please current password"
        }if(!newpassword){
            error.newpassword ="please enter newpassword"
        }if(!confirmnewpassword){
            error.confirmnewpasswordnewpassword ="please enter confirmnewpassword"
        }
        return error
    }
    const applychangepassword = async()=> {
        const user =  await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        let error = validatefield()
        setError(error)
        if(Object.keys(error).length===0){
            fetch("http://localhost:7000/auth/ChangePassword", { method: "PUT", headers: { 'content-type': "application/json" }, body: JSON.stringify({email:user.email,currentpassword,newpassword}) }).then(function (res) {
              return res.json()
          }).then(function (result) {
              if(result._id){
                  setShowAlert(true)
            }
              console.log("password added succesfully")   
          })
           }else{
              return;
           } 
        }

    const changepassword =(e)=>{
       e.preventDefault();
        applychangepassword();
    }
    return(
     <div>
          <div>
            <h1> change password</h1>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <form onSubmit={changepassword}>
                        <div className="form-group" style={{ padding: "10px" }}>
                            <label>current password</label>
                            <input type="text" class="form-control" value={currentpassword} onChange={oncurrentpasswordchange} />
                        </div>
                       {/* <p style={{color:"red"}} >{error?.taskname}</p>*/}
                        <div class="form-group">
                            <label>New password</label>
                            <input type="text" class="form-control"  value={newpassword} onChange={onnewpasswordchange} />
                        </div>
                        <div class="form-group">
                            <label>confirm new  password</label>
                            <input type="text" class="form-control" value={confirmnewpassword} onChange={onConfirmnewpasswordchange} />
                        </div>
                      {/*  <p style={{color:"red"}} >{error?.taskdes}</p>*/}
                        <button type="submit" class="btn btn-success" style={{ margin: "10px" }}>update password</button>
                    </form>
                </div>
            </div>
          {showAlert &&<div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                       password updated successfully!!
                    </div>
                </div>
    </div>}
        </div>
     </div>
    )
}
export default ChangePassword