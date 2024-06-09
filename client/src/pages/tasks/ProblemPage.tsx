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
    let { id: index } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [tests, setTests] = useState<Test[]>([]);
    const editorRef = useRef<any>(null);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [score, setScore] = useState(0);

    const user = JSON.parse(localStorage.getItem("user") || '{}');

    useEffect(() => {
        getProblem();
        getTests();
    }, [index]);

    useEffect(() => {
        if (task) {
            getSolution();
        }
    }, [task]);

    const getProblem = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/task/${index}`);
            setTask(response.data);
        } catch (err: any) {
            console.log("Error: " + err.response.data);
        }
    };

    const getTests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/tasktest/task/${index}`);
            setTests(response.data);
        } catch (err: any) {
            console.log("Error: " + err.response.data);
        }
    }

    const submitSolution = async () => {
        const solution = editorRef.current?.getValue();
        let data = {
            solution: solution,
            taskID: task?._id,
            userId: user.id
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/tester/check`, data);
            setTestResults(response.data);
            getScore(response.data);
            setPopupVisible(true);
        } catch (err: any) {
            console.log("Error: " + err.response.data);
        }
    }

    const getScore = (testResults: TestResult[]) => {
        let score = 0;
        testResults.forEach((test) => {
            if (test.passed) {
                score++;
            }
        });
        setScore(10 / testResults.length * score);
    }

    const saveSolution = async () =>{
        const solution = editorRef.current?.getValue();
        let data = {
            userId: user.id,
            textBlob: solution,
            score: score
        };

        try {
            await axios.post(`${process.env.REACT_APP_API_ADDRESS}/solution/task/${task?._id}`, data);
            console.log("Solution saved");
        } catch (err: any) {
            console.log("Error: " + err.response.data);
        }
    }

    const ssbuttonClicked = () => {
        submitSolution();
        saveSolution();
    }

    const getSolution = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}/solution/user/${user.id}/task/${task?._id}`);
            editorRef.current?.setValue(response.data.textBlob);
        } catch (err: any) {
            console.log("Error: " + err.response.data);
        }
    }

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
                <p>Difficulty: {task?.difficulty}</p>
                <p>Description: {task?.description}</p>
                <p>Language: {task?.language}</p>
            </div>
            <div className="row codingRow mt-5">
                <div className="col-md-8 mx-5">
                    <div className="code-editor-container">
                        <CodeEditor ref={editorRef} language={task?.language.toLowerCase()} />
                    </div>
                    <div className="row">
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP" onClick={ssbuttonClicked}>Save & Submit</button>
                        <button className="btn btn-lg mt-4 ms-2 submitButtonPP" onClick={goBack}>Go Back</button>
                    </div>
                </div>
                <div className="col-md-2">
                    <h2>Tests:</h2>
                    <div className="tests-container">
                        {tests.map((test, index) => (
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
