import React, { useEffect, useState } from 'react';
import {useParams} from "react-router";
import "../../style/ProblemPage.css";
import CodeEditor from "../../CodeEditor";
import axios from 'axios';

type Task = {
    name: string;
    difficulty: string;
    description: string;
    deadline: Date;
};

type Test = {
    _id: string;
    input: string;
    output: string;
};

const ProblemPage: React.FC = () => {
    let index = useParams().id;
    const [task, setTask] = useState<Task>();
    const [tests, setTests] = useState<Test[]>([]);

    const getProblem = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tasks/" + index)
            .then((response) => {
                console.log(response.data);
                setTask(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    };

    const getTests = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tests")
            .then((response) => {
                console.log(response.data);
                setTests(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    };

    useEffect(() => {
        getProblem();
        getTests();
    }   , []);


    return (
        <div className="problemPage-container">
            <h1 className="my-5">Problem {index}</h1>
            <div className="row">
                <p>Name: {task?.name}</p>
                <p>Difficulty: {task?.difficulty} </p>
                <p>Time remaining: {task?.deadline?.toString()} </p>
                <p>Description: {task?.description} </p>
            </div>
            <div className="row codingRow mt-5">
                <div className="col-md-8 mx-5"> {/* Adjust the column width for CodeEditor */}
                    <div className="code-editor-container">
                        <CodeEditor initialValue="console.log('Hello, world!');"/>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP">Submit</button>
                    </div>
                </div>
                <div className="col-md-2"> {/* Adjust the column width for Tests section */}
                    <h2>Tests:</h2>
                    <div>
                        {tests.map((test) => {
                            return (
                                <div key={test._id} className="test">
                                    <p>Test: {test._id}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
