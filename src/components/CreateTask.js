import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTask() {
    const [taskname, setTaskname] = useState("")
    const [taskdes, setTaskdes] = useState("")
    const [showAlert,setShowAlert] = useState(false)
    const [error,setError] = useState({})
   const Navigate = useNavigate()

    const onTasknamechange = (e) => {
        setTaskname(e.target.value)
    }

    const onTaskdeschange = (e) => {
        setTaskdes(e.target.value)
    }
    const validateTaskfield=()=>{
        let error ={};
        if(!taskname){
            error.taskname ="please enter taskname"
        }if(!taskdes){
            error.taskdes ="please enter taskdes"
        }
        return error
    }
    const CreateTask = (taskData) => {
        let error = validateTaskfield()
        setError(error)
        if(Object.keys(error).length===0){
            fetch("http://localhost:7000/task/create", { method: "POST", headers: { 'content-type': "application/json" }, body: JSON.stringify(taskData) }).then(function (res) {
                return res.json()
            }).then(function (result) {
                if(result._id){
                    setShowAlert(true)
                }
                console.log("data saved successfully")
                Navigate("/")
            })
        }else{
            return ;
        }
     
    }

    const saveTask = (e) => {
        e.preventDefault();
        let taskData = {
            taskname,
            taskdes,
            status: "not-started",
            assigned: true
        }
        CreateTask(taskData)
    }
    return (
        <div>
            <h1> create task page</h1>
            <div className="card" style={{ width: "30rem" }}>
                <div className="card-body">
                    <form onSubmit={saveTask}>
                        <div className="form-group" style={{ padding: "10px" }}>
                            <label>Task Name</label>
                            <input type="text" class="form-control" placeholder="Enter task name" value={taskname} onChange={onTasknamechange} />
                        </div>
                        <p style={{color:"red"}} >{error?.taskname}</p>
                        <div class="form-group">
                            <label>Task Description</label>
                            <input type="text" class="form-control" placeholder="enter task description" value={taskdes} onChange={onTaskdeschange} />
                        </div>
                        <p style={{color:"red"}} >{error?.taskdes}</p>
                        <button type="submit" class="btn btn-success" style={{ margin: "10px" }}>Submit</button>
                    </form>
                </div>
            </div>
            {showAlert &&<div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                       Task created successfully!!
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default CreateTask