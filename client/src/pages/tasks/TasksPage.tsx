import $ from "jquery";
import axios from "axios";
import React, {useState, SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import "../../style/TasksPage.css";

type Task = {
    name: string;
    description: string;
    deadline: Date;
};

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = (event: SyntheticEvent) => {
        event.preventDefault();
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLInputElement).value;
        const deadline = new Date((document.getElementById("deadline") as HTMLInputElement).value);

        const newTask: Task = {
            name: name,
            description: description,
            deadline: deadline, // Fix: Change the type from Date to string
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    return (
        <div className="TaskPage">
            {/*<div className="row">*/}
            {/*    <div className="col">*/}
            {/*        <div className="content">*/}
            {/*            <h2>Add new task</h2>*/}
            {/*            <form className="form">*/}
            {/*                <div>*/}
            {/*                    <label htmlFor="name">Name</label>*/}
            {/*                    <input type="text" id="name" name="name" className="inputBox"/>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <label htmlFor="description">Description</label>*/}
            {/*                    <input type="text" id="description" name="description" className="inputBox"/>*/}
            {/*                </div>*/}
            {/*                <div>*/}
            {/*                    <label htmlFor="deadline">Deadline</label>*/}
            {/*                    <input type="date" id="deadline" name="deadline" className="inputBox"/>*/}
            {/*                </div>*/}
            {/*                <button onClick={createTask} className="btn btn-lg mt-4 createTaskButton">Create Task*/}
            {/*                </button>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
                                {/*{tasks.map((task, index) => (*/}
                                {/*    <tr key={index}>*/}
                                {/*        <td>{task.name}</td>*/}
                                {/*        <td>{task.description}</td>*/}
                                {/*        <td>{task.deadline.toLocaleDateString()}</td>*/}
                                {/*        <td>*/}
                                {/*            <Link to={`/tasks/${index}`}>Solve the problem</Link>*/}
                                {/*        </td>*/}
                                {/*    </tr>*/}
                                {/*))}*/}

                                <tr key={0}>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>21/05/2024</td>
                                    <td>
                                        <Link to={'/tasks/0'} className="linkColor">Solve the problem</Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Link to={'/dashboard'} className="btn ms-3 goToDashboardButton">Go to Dashboard</Link>
            </div>
        </div>
    )
}

// function showTasks() {
//     axios.get(process.env.REACT_APP_API_ADDRESS + "/tasks").then((response) => {
//         console.log(response.data);
//     }).catch((err) => {
//         console.log("Error: " + err.response.data);
//     });
// }


// function requestTask(event: any) {
//     event.preventDefault();
//     const name = $("#name")
//     const description = $("#description")
//     const deadline = $("#deadline")
//     if (name.length !== 0 || description.length !== 0
//     || deadline.length !== 0) {
//         const data = {
//             name: name.val(),
//             description: description.val(),
//             deadline: deadline.val()
//         };
//         axios.post(process.env.REACT_APP_API_ADDRESS + "/tasks", data).then((response) => {
//             console.log(response.data);
//         }).catch((err) => {
//             console.log("Error: " + err.response.data);
//         });
//     }
// }

export default TasksPage;