import { useState, useEffect } from "react"


function AdminTask() {
    const [tasks, setTasks] = useState([])
    const [searchkey, setSearchkey] = useState("")
    const [filteredtask, setFilteredtask] = useState([])
    const [status, setStatus] = useState(["All", "InProgress", "Completed", "not-started"])
    const [taskSummary, setTaskSummary] = useState({ TotalCount: 0,AvailableTask:0, AssignTask:0,InProgressCount: 0, completedCount: 0})
    const getAllTasks = () => {
        fetch("http://localhost:7000/task/all").then((res) => {
            return res.json();
        }).then((result) => {

            setTasks(result)
            setFilteredtask(result)
        })
    }
    const getAllAvailableTask=()=>{
        fetch("http://localhost:7000/task/AvailableTask").then((res) => {
            return res.json();
        }).then((result) => {

            setTasks(result)
            setFilteredtask(result)
        })
    }
    const getTasksummary = (e) => {
        fetch("http://localhost:7000/task/summary").then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result)
            setTaskSummary(result)
        })
    }

    useEffect(() => {
       // getAllTasks();
       getAllAvailableTask();
        getTasksummary();

    }, []);

    const deleteTask = (e, id) => {
        fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
            return res.text();
        }).then((result) => {
            getAllTasks(result);
        })
    }
    const searchTask = (e) => {
        setSearchkey(e.target.value)
        if (e.target.value) {
            let filterdTaskData = tasks.filter((item) => {
                return item.taskname.includes(e.target.value)
            })
            setFilteredtask(filterdTaskData)
        } else {
            setFilteredtask(tasks)
        }
    }
    const startTask = (e, id, status) => {
        if (status === "InProgress") {
            status = "Completed"
        } else {
            status = "InProgress"
        }
        fetch("http://localhost:7000/task/update/" + id, { method: "PUT", headers: { "content-type": 'Application/Json' }, body: JSON.stringify({ status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks(result);
        })
    }
    const assignTasktouser= async (taskId, status)=>{
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        if (status === "InProgress") {
            status = "Completed"
        } else {
            status = "InProgress"
        }
        fetch("http://localhost:7000/user/task/assignTask", { method: "POST", headers: { "content-type": 'Application/Json' }, body: JSON.stringify({ taskId: taskId,  userId: user. userId, status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks(result);
        })
    }

    const assignTask = async (e, taskId, status) => {
        assignTasktouser(taskId, status)

    }

    const getTasksByStatus = (status) => {
        fetch("http://localhost:7000/task/bystatus/" + status).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredtask(result)
        })
    }

    const onstatuschange = (e) => {
        // console.log(e.target.value)
        getTasksByStatus(e.target.value)
    }


    return (
        <div className="container">

            <div className="row mt-3">
            <div className="col-md-3">
                    <div className="card text-center mb-3" style={{ borderBottom: "5px solid blue" }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Task</h5>
                            <p className="card-text">{taskSummary. TotalCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3" style={{ borderBottom: "5px solid blue" }}>
                        <div className="card-body">
                            <h5 className="card-title">Assign Task</h5>
                            <p className="card-text">{taskSummary. AssignTask}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3" style={{ borderBottom: "5px solid blue" }}>
                        <div className="card-body">
                            <h5 className="card-title">Available Task</h5>
                            <p className="card-text">{taskSummary.AvailableTask}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3" style={{ borderBottom: "5px solid orange" }}>
                        <div className="card-body">
                            <h5 className="card-title">InProgress Task</h5>
                            <p className="card-text">{taskSummary.InProgressCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3" style={{ borderBottom: "5px solid green" }}>
                        <div className="card-body">
                            <h5 className="card-title">Completed Task</h5>
                            <p className="card-text">{taskSummary.completedCount}</p>
                        </div>
                    </div>
                </div>
          
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <input type="text" style={{ width: "100%", height: "40px", borderRadius: "20px" }} placeholder="search Task" value={searchkey} onChange={searchTask} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <h1>TaskList</h1>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" onChange={(e) => onstatuschange(e)}>
                            {status.map((item) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })}

                        </select>
                    </div>
                </div>

                {filteredtask.length === 0 && <h4>no task available</h4>}
                {filteredtask.map((tasks) => {
                    return (
                        <div className="col-md-3 mt-3">
                            <div className="card">
                                {tasks.status === 'InProgress' && <button className="btn btn-primary" style={{ position: "absolute", border: "none" }} onClick={(e) => startTask(e, tasks._id, tasks.status)}>{'Completed'}</button>}
                                {tasks.status === 'not-started' && <button className="btn btn-primary" style={{ position: "absolute", border: "none" }} onClick={(e) => assignTask(e, tasks._id, tasks.status)}>{'start'}</button>}
                                <img src="https://tse1.mm.bing.net/th?id=OIP.tSRRipIbDmNDBtdg6ouakQHaHa&pid=Api&P=0&h=180" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{tasks.taskname}</h5>
                                    <p className="card-text">{tasks.taskdes}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span className="badge bg-success">{tasks.status}</span>
                                        <span className="badge bg-danger" onClick={(e) => deleteTask(e, tasks._id)}>delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}



            </div>
        </div>
    )
}

export default AdminTask