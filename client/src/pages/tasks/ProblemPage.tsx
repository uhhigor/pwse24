import React, { useEffect, useState } from 'react';
import {useParams} from "react-router";
import "../../style/ProblemPage.css";
import CodeEditor from "../../CodeEditor";
import axios from 'axios';

type Task = {
    name: string;
    difficulty: string;
    description: string;
    language: string;
    tests: Test[];
};

type Test = {
    givenInput: string;
    expectedOutput: string;
}

const ProblemPage: React.FC = () => {
    let index = useParams().id;
    const [task, setTask] = useState<Task>();
    const [tests, setTests] = useState<Test[]>();

    const getProblem = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/task/" + index)
            .then((response) => {
                setTask(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    };

    const getTests = () => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/tasktest/task/" + index)
        // axios.get(process.env.REACT_APP_API_ADDRESS + "/tests/" + index)
            .then((response) => {
                setTests(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }

    const submitSolution = () => {
        let data = {
            language:"python",
            solution:"def solution(a,b):\n\treturn a+b",
            taskID:2137
        }
        axios.post(process.env.REACT_APP_API_ADDRESS + '/tester/check',data)
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
                <p>Language: {task?.language} </p>
                <p>Description: {task?.description} </p>
            </div>
            <div className="row codingRow mt-5">
                <div className="col-md-8 mx-5">
                    <div className="code-editor-container">
                        <CodeEditor initialValue="console.log('Hello, world!');"/>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP" onClick={submitSolution}>Submit</button>
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP" onClick={goBack}>Go Back</button>
                    </div>
                </div>
                <div className="col-md-2">
                    <h2>Tests:</h2>
                    <div className="tests-container">
                        {tests?.map((test, index) => (
                            <div key={index} className="test">
                                <h5>Test {index + 1}</h5>
                                <p>Input: {test.givenInput}</p>
                                <p>Output: {test.expectedOutput}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProblemPage;
