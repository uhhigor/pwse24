import axios from "axios";
import React, {useState, SyntheticEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "../../style/TasksPage.css";
import {getEmail} from "../../UserData";

type Task = {
    _id: string;
    name: string;
    description: string;
    deadline: Date;
};

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    function showTasks() {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tasks").then((response) => {
            setTasks(response.data);
        }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }

    useEffect(() => {
        showTasks();
    }, []);

    return (
        <div className="TaskPage">
            <div className="row">
                <div className="col">

                    <div className="table-container">
                        <h2>Tasks</h2>
                        <div className='table-responsive'>
                            <table className=" table table-borderless">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.deadline.toString().substring(0,10) + ", " + task.deadline.toString().substring(11, 19)}</td>
                                        <td>
                                            <Link to={`/tasks/${task._id}`}>Solve the problem</Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Link to={'/dashboard'} className="btn ms-3 goToDashboardButton">Go to Dashboard</Link>
                <Link to={`/profileManagement/${encodeURIComponent(getEmail() as string)}`} className="btn ms-3 goToDashboardButton">Go to your profile</Link>
            </div>
        </div>
    )
}
export default TasksPage;