import $ from "jquery";
import axios from "axios";
import React, { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

type Task = {
    name: string;
    description: string;
    deadline: Date;
};

const TaskPage: React.FC = () => {
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
            <h1>Tasks</h1>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" />
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input type="text" id="deadline" name="deadline" />
                </div>
                <button onClick={createTask}>Create Task</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.deadline.toLocaleDateString()}</td>
                            <td>
                                <Link to={`/tasks/${index}`}>Complete the task</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default TaskPage;