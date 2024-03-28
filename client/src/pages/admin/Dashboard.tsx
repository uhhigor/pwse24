import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {FaCode, FaClipboardList, FaUser, FaPencil, FaTrashCan} from "react-icons/fa6";
import '../../style/Dashboard.css'
import data from './exampleData.json'

export const Dashboard = () => {

    const [tasks, setTasks] = useState(data.problems);
    const [amountOfTests, setAmountOfTest] = useState(0);
    const [showedDescription, setShowedDescription] = useState("");
    const [showedTests, setShowedTest] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('description');
    const navigate = useNavigate();

    useEffect(() => {
        let count = 0;
        tasks.forEach((task: any) => {
            count += task.tests.length;
        })
        setAmountOfTest(count);
    }, [tasks])

    function handleRowClick(task: any) {
        setShowedDescription(task.description)
        setShowedTest(task.tests);
    }

    function handleAddProblem() {
        navigate("/tasks");
    }

    return (
        <div className="dashboard-container">
            <div className="row">
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
                            <span>{amountOfTests}</span>
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
                            <span>0</span>
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
                                tasks.map((task: any) => {
                                    return (
                                        <tr
                                            onClick={() => handleRowClick(task)}
                                        >
                                            <th>{task.id}</th>
                                            <td>{task.name}</td>
                                            <td>{task.difficulty}</td>
                                            <td>{task.date}</td>
                                            <td>{task.deadline}</td>
                                            <td>
                                                <FaPencil/>
                                                &nbsp;
                                                <FaTrashCan/>
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
                            disabled={showedDescription === ""}
                            className="btn col-6 tab-btn m-1"
                            onClick={() => setActiveTab('description')}>
                            Description
                        </button>
                        <button
                            disabled={!showedTests}
                            className="btn col-5 tab-btn m-1"
                            onClick={() => setActiveTab('tests')}>
                            Tests
                        </button>
                    </div>

                    {activeTab === 'description' && (
                        <div className="description">
                            <span>
                                {showedDescription}
                            </span>
                        </div>
                    )}

                    {activeTab === 'tests' && (
                        <div className="tests">
                            <ul>
                                {showedTests!.map((test: any) => {
                                    return (
                                        <li>{test.name}</li>
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
                        onClick={handleAddProblem}
                        className="btn tab-btn">
                        Add Problem
                    </div>
                </div>
            </div>
        </div>
    )
}