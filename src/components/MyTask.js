import { useState, useEffect } from "react"


function MyTask() {
    const [tasks, setTasks] = useState([])
    const [searchkey, setSearchkey] = useState("")
    const [filteredtask, setFilteredtask] = useState([])
    const [status, setStatus] = useState(["All", "InProgress", "Completed", "not-started"])
    const [taskSummary, setTaskSummary] = useState({  InProgressCount: 0, completedCount: 0 })
    const getMyTask = async () => {
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        fetch("http://localhost:7000/user/task/MyTask/" + user.userId).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredtask(result)
        })
    }
    const completeTask = (e, id) => {
        fetch("http://localhost:7000/user/task/completeTask", { method: "PUT", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ id: id, status: "Completed" }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getMyTask();
        })
    }
  const  getTaskSummaryByUser = async ()=>{
    const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
    fetch("http://localhost:7000/user/task/summary/" + user.userId).then((res) => {
        return res.json();
    }).then((result) => {
        setTaskSummary(result);
    })
  }

    useEffect(() => {
        getMyTask();
        getTaskSummaryByUser();

    }, []);

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

    const getTasksByStatus = async (status) => {
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        fetch(`http://localhost:7000/user/task/${user.userId}/byStatus/${status}`).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredtask(result)
        })
    }

    const onstatuschange = (e) => {
        console.log(e.target.value)
        getTasksByStatus(e.target.value)
    }

    return (
        <div className="container">
            <div className="row mt-3">

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
            </div>
            <div className="row">
                <div className="col-md-12 mt-3">
                    <input type="text" style={{ width: "100%", height: "40px", borderRadius: "20px" }} placeholder="search Task" value={searchkey} onChange={searchTask} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h1>My Task list</h1>
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
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <input type="text" style={{ width: "100%", height: "40px", borderRadius: "20px" }} placeholder="search Task" value={searchkey} onChange={searchTask} />
                    </div>
                </div>
                return (

                    <div className="col-md-3 mt-3">
                        <div className="card">
                            {tasks.status === 'InProgress' && <button className="btn btn-primary" style={{ position: "absolute", border: "none" }} onClick={(e) => completeTask(e, tasks._id)}>{'Completed'}</button>}
                            {/* {tasks.status === 'not-started' && <button className="btn btn-primary" style={{ position: "absolute", border: "none" }} onClick={(e) => assignTask(e, tasks._id, tasks.status)}>{'start'}</button>}*/}
                            <img src="https://tse1.mm.bing.net/th?id=OIP.tSRRipIbDmNDBtdg6ouakQHaHa&pid=Api&P=0&h=180" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{tasks?.taskId?.taskname}</h5>
                                <p className="card-text">{tasks?.taskId?.taskdes}</p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span className="badge bg-success">{tasks?.status}</span>
                                    {/*<span className="badge bg-danger" onClick={(e) => deleteTask(e, tasks._id)}>delete</span>*/}
                                </div>
                            </div>
                        </div>
                    </div>


                )
            })
            }



        </div>

    )
}

export default MyTask
