import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router";
import "../../style/ProblemPage.css";
import CodeEditor from "../../CodeEditor";
import axios from 'axios';
import ResultsPopup from "./ResultsPopup";

type Task = {
    _id: string;
    name: string;
    description: string;
    tests: Test[];
    difficulty: string;
    language: string;
}

type Test = {
    id: string;
    givenInput: string;
    expectedOutput: string;
}

type TestResult = {
    _id: string;
    body: string;
    passed: boolean;
}


const ProblemPage: React.FC = () => {
    let index = useParams().id;
    const [task, setTask] = useState<Task>();
    const [tests, setTests] = useState<Test[]>();
    const editorRef = useRef<any>(null);
    const [testResults, setTestResults] = useState<TestResult[]>();
    const [isPopupVisible, setPopupVisible] = useState(false);

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
            .then((response) => {
                setTests(response.data);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }


    const submitSolution = () => {
        const solution = editorRef.current?.getValue();
        let data = {
            language: task?.language.toLowerCase(),
            solution: solution,
            taskID: task?._id
        }
        axios.post(process.env.REACT_APP_API_ADDRESS + '/check', data)
            .then((response) => {
                setTestResults(response.data);
                setPopupVisible(true);
            }).catch((err) => {
            console.log("Error: " + err.response.data);
        });
    }

    useEffect(() => {
        getProblem();
        getTests();
        console.log(isPopupVisible)
    }, []);

    const goBack = () => {
        window.history.back();
    }

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className="problemPage-container">
            <h1 className="my-5">{task?.name}</h1>
            <div className="row">
                <p>Name: {task?.name}</p>
                <p>Difficulty: {task?.difficulty} </p>
                <p>Description: {task?.description} </p>
                <p>Language: {task?.language} </p>
            </div>
            <div className="row codingRow mt-5">
                <div className="col-md-8 mx-5">
                    <div className="code-editor-container">
                        <CodeEditor ref={editorRef} language={task?.language.toLowerCase()} />
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

            <ResultsPopup testResults={testResults} isOpen={isPopupVisible} onClose={handleClosePopup} />
        </div>
    );
};

export default ProblemPage;
