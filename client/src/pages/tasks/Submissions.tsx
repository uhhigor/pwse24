import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

interface Submission {
    task: string;
    score: number;
}

interface Task {
    _id: string;
    name: string;
}

function Submissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    const getSubmissions = async () => {
        try {
            const submissionsResponse = await axios.get(process.env.REACT_APP_API_ADDRESS + "/solution/user/" + user.id);
            const submissionsData: Submission[] = submissionsResponse.data;
            setSubmissions(submissionsData);
            const taskIds = []
            for (const submission of submissionsData) {
                taskIds.push(submission.task);
            }
            console.log(taskIds)
            await getTasks(taskIds);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError('An error occurred while fetching data.');
        }
    }

    const getTasks = async (taskIds: string[]) => {
        try {
            const tasksData: Task[] = [];

            for (const taskId of taskIds) {
                const taskResponse = await axios.get(process.env.REACT_APP_API_ADDRESS + "/task/" + taskId);
                const taskData: Task = taskResponse.data;
                tasksData.push(taskData);
            }
            console.log(tasksData)
            setTasks(tasksData);
        } catch (error) {
            console.error("Error fetching tasks: ", error);
            setError('An error occurred while fetching tasks.');
        }
    }

    useEffect(() => {
        getSubmissions();
    }, []);

    return (
        <>
            <div className="TaskPage">
                <div className="row">
                    <div className="col">
                        <div className="table-container">
                            <h2>Submissions</h2>
                            <div className='table-responsive'>
                                <table className=" table table-borderless">
                                        <thead>
                                        <tr>
                                            <th>Task Title</th>
                                            <th>Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {submissions.map((submission, index) => (
                                            <tr key={index}>
                                                <td>{tasks.find(task => task._id === submission.task)?.name}</td>
                                                <td>{submission.score}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Link to={'/home'} className="btn ms-3 goToDashboardButton">Go to home</Link>
                </div>
            </div>
        </>
    )
}

export default Submissions;
