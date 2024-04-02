import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {FaCode, FaClipboardList, FaUser, FaPencil, FaTrashCan} from "react-icons/fa6";
import '../../style/Dashboard.css'
import axios from "axios";
import { AddProblemForm } from "./AddProblemForm";
import { EditProblemForm } from "./EditProblemForm";
import { TestPopup } from "./TestPopup";

export const Dashboard = () => {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState<any>([]);
    const [tests, setTests] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);

    const [description, setDescription] = useState('');
    const [pickedTests, setPickedTests] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [testInfo, setTestInfo] = useState({input: '', output: ''})

    useEffect(() => {

    }, [tasks, tests])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tasks")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tests")
            .then((response) => {
                setTests(response.data);
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
        axios.get(process.env.REACT_APP_API_ADDRESS + "/users/")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }, [])

    const handleDelete = (task: any) => {
        axios.delete(process.env.REACT_APP_API_ADDRESS + "/admin/deleteTask/" + task._id)
        .then((response) => {
            if (response.status === 204) {
                let newTests = [...tests];
                let newTasks = [...tasks];
                const Tests = new Set(task.tests);
                newTests = newTests.filter((newTest) => {
                    return !Tests.has(newTest._id);
                })
                newTasks = newTasks.filter((newTask) => {
                    return task._id !== newTask._id;
                })
                setTasks(newTasks);
                setTests(newTests);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="dashboard-container">
            <div className="row m-5">
                <div className="col-4">
                    <div className="widget-container">
                        <div className="icon">
                            <FaCode/>
                        </div>
                        <div className="title">
                            <span>Problems</span>
                        </div>
                        <div className="value">
                            <span>{tasks.length}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="widget-container">
                        <div className="icon">
                            <FaClipboardList/>
                        </div>
                        <div className="title">
                            <span>Tests</span>
                        </div>
                        <div className="value">
                            <span>{tests.length}</span>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="widget-container">
                        <div className="icon">
                            <FaUser/>
                        </div>
                        <div className="title">
                            <span>Users</span>
                        </div>
                        <div className="value">
                            <span>{users.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-8">
                    <div className='table-responsive'>
                        <table className='table table-borderless'>
                            <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Difficulty</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Deadline</th>
                                <th scope='col'></th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map((task: any, index: number) => {
                                        const date = new Date(task.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        });
                                        
                                        const deadline = new Date(task.deadline).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        });

                                        return (
                                            <tr
                                                key={`tablerow${index}`}
                                                onClick={() => {
                                                    setDescription(task.description);
                                                    setPickedTests(task.tests);
                                                    setActiveTab('description');
                                                }}
                                            >
                                                <th>{index + 1}</th>
                                                <td>{task.name}</td>
                                                <td>{task.difficulty}</td>
                                                <td>{date}</td>
                                                <td>{deadline}</td>
                                                <td>
                                                    <FaPencil 
                                                     className="edit"
                                                     data-bs-toggle="modal" 
                                                    data-bs-target="#editProblem"
                                                    onClick={() => {
                                                        setEditingTask(task);
                                                    }}
                                                    />
                                                    &nbsp;
                                                    <FaTrashCan 
                                                    className="delete"
                                                    onClick={() => {
                                                        handleDelete(task);
                                                    }}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-4">
                    <div className="row m-lg-0">
                        <button
                            disabled={description === ''}
                            className="btn col-6 tab-btn m-1"
                            onClick={() => {
                                setActiveTab('description')
                            }}>
                            Description
                        </button>
                        <button
                            disabled={description === ''}
                            className="btn col-5 tab-btn m-1"
                            onClick={() => {
                                setActiveTab('tests')
                            }}>
                            Tests
                        </button>
                    </div>

                    {activeTab === 'description' && (
                        <div className="description">
                            <span>
                                {description}
                            </span>
                        </div>
                    )}

                    {activeTab === 'tests' && (
                        <div className="tests">
                            <ul>
                                {pickedTests!.map((test: any, index: number) => {
                                    return (
                                        <li
                                        data-bs-toggle="modal" 
                                        data-bs-target="#test"
                                        onClick={() => {
                                            const foundTest = tests.find((t: any) => {
                                                return t._id === test;
                                            });
                                            if (foundTest) {
                                                setTestInfo(foundTest);
                                            }
                                        }}
                                        >
                                            {`Test ${index + 1}`}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div
                        data-bs-toggle="modal" 
                        data-bs-target="#addProblem"
                        className="btn tab-btn">
                        Add Problem
                    </div>
                </div>
            </div>
            <TestPopup test={testInfo}/>
            <AddProblemForm setTasks={setTasks} setOldTests={setTests}/>
            <EditProblemForm setTasks={setTasks} setOldTests={setTests} editingTask={editingTask} existingTests={tests} />
        </div>
    )
}