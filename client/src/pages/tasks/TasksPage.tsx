import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "../../style/TasksPage.css";
import {getEmail} from "../../UserData";
import {CgLogOut} from "react-icons/cg";

type Task = {
    _id: string;
    name: string;
    description: string;
    difficulty: string;
    language: string;
};

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // function showTasks() {
    //     axios.get(process.env.REACT_APP_API_ADDRESS + "/task").then((response) => {
    const showTasks = async (): Promise<void> => {
        try {
            const response = await axios.get<Task[]>(`${process.env.REACT_APP_API_ADDRESS}/task`);
            setTasks(response.data);
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        showTasks();
    }, []);

    const deleteCookie = (name: string, path: string = '/'): void => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    };



    const logOut = (): void => {
        delete axios.defaults.headers.common['Authorization'];
        deleteCookie('token');
        localStorage.clear();
        window.location.href = '/login';
    };


    const substringDescription = (description: string): string => {
        if (description === undefined) return "";
        else {
            return description.length > 50 ? description.substring(0, 50) + "..." : description;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="TaskPage">
            <div className="row">
                <div className="col">
                    <div className="table-container">
                        <h2>Tasks</h2>
                        <div className='table-responsive'>
                            <table className="table table-borderless">
                                <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Difficulty</th>
                                    <th>Language</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={task._id}>
                                        <td>{index + 1}</td>
                                        <td>{task.name}</td>
                                        <td>{substringDescription(task.description)}</td>
                                        <td>{task.difficulty}</td>
                                        <td>{task.language}</td>
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
                <Link to={'/home'} className="btn ms-3 goToDashboardButton">Go to home</Link>
            </div>
        </div>
    );
};

export default TasksPage;
