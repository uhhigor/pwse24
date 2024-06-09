import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

interface Submission {
    taskId: string;
    score: number;
}

interface Task {
    id: string;
    title: string;
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

            const taskIds = submissionsData.map(submission => submission.taskId);
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
                const taskResponse = await axios.get(process.env.REACT_APP_API_ADDRESS + "/tasks/" + taskId);
                const taskData: Task = taskResponse.data;
                tasksData.push(taskData);
            }

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
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Task Title</th>
                                            <th>Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {submissions.map((submission, index) => (
                                            <tr key={index}>
                                                <td>{tasks.find(task => task.id === submission.taskId)?.title}</td>
                                                <td>{submission.score}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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
