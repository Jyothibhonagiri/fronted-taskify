import { useState, useEffect } from "react"


function Users() {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        fetch("http://localhost:7000/auth/users").then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result)
            setUsers(result)
        })
    }
    useEffect(() => {
        getAllUsers();
    })

    const userActivateDeactive = (e, id, active) => {
        const activeFlag = active ? false : true
        fetch("http://localhost:7000/auth/active_deactivate", { method: "PUT", headers: { "content-type": 'Application/Json' }, body: JSON.stringify({ id: id, active: activeFlag }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllUsers(result);
        })
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <table className="table table-light">
                    <thead>
                        <tr>

                            <th scope="col">fullname</th>
                            <th scope="col">email</th>
                            <th scope="col">role</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role ? user.role : "user"}</td>
                                    <td>{ (user.active===true) && <button className="btn btn-success" onClick={(e) => userActivateDeactive(e, user._id, user.active)}>Deactivate</button>}
                                        {user.active === false && <button className="btn btn-success" onClick={(e) => userActivateDeactive(e, user._id, user.active)}>Activate</button>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )

}
export default Users