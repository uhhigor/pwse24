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
    tests: Test[];
};

type Test = {
    input: string;
    output: string;
}

const ProblemPage: React.FC = () => {
    let index = useParams().id;
    const [task, setTask] = useState<Task>();
    const [tests, setTests] = useState<Test[]>();

    const getProblem = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tasks/" + index)
            .then((response) => {
                setTask(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    };

    const getTests = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tests/" + index)
            .then((response) => {
                setTests(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }

    useEffect(() => {
        getProblem();
        getTests();
    }   , []);

    const goBack = () => {
        window.history.back();
    }


    return (
        <div className="problemPage-container">
            <h1 className="my-5">Problem {task?.name}</h1>
            <div className="row">
                <p>Name: {task?.name}</p>
                <p>Difficulty: {task?.difficulty} </p>
                <p>Time remaining: {task?.deadline?.toString().substring(0,10) + ", " + task?.deadline?.toString().substring(10, 19)} </p>
                <p>Description: {task?.description} </p>
            </div>
            <div className="row codingRow mt-5">
                <div className="col-md-8 mx-5">
                    <div className="code-editor-container">
                        <CodeEditor initialValue="console.log('Hello, world!');"/>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP">Submit</button>
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP" onClick={goBack}>Go Back</button>
                    </div>
                </div>
                <div className="col-md-2">
                    <h2>Tests:</h2>
                    <div className="tests-container">
                        {tests?.map((test, index) => (
                            <div key={index} className="test">
                                <h5>Test {index + 1}</h5>
                                <p>Input: {test.input}</p>
                                <p>Output: {test.output}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProblemPage;
