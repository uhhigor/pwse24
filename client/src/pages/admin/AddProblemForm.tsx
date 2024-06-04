import axios from "axios";
import React, { useState } from "react";
import "../../style/ProblemForms.css"

export const AddProblemForm = ({setTasks, setOldTests}: any) => {

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [language, setLanguage] = useState("Python");
    const [description, setDescription] = useState("");
    const [numberOfTests, setNumberOfTests] = useState(1);
    const [tests, setTests] = useState([{'input': '', 'output': ''}]);

    const handleTestsNumberChange = (e: any) => {
        const num = parseInt(e.target.value, 10);
        if (num > 0 && num <= 10) {
            setNumberOfTests(num);
            const newTests = Array(num).fill({'input': '', 'output': ''});
            setTests(newTests);
        }
    }

    const handleSubmit = () => {
        axios.post(process.env.REACT_APP_API_ADDRESS + "/task/", {
            name: name,
            difficulty: difficulty,
            language: language,
            description: description,
            tests: tests
        })
            .then((response) => {
                setTasks((oldTasks: any) => [...oldTasks, response.data.task]);
                setOldTests((oldTests: any) => [...oldTests, ...response.data.createdTests])
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="modal fade addProblem-container" id="addProblem" tabIndex={-1} aria-labelledby="addProblemLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addProblemLabel">Add new problem</h5>
                        <button type="button" className="btn-close danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row" action="">
                            <label className="col-3" htmlFor="name">Task name: </label>
                            <input value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-8" type="text" id="name" name="name"/>
                        </form>
                        <form className="row" action="">
                            <label className="col-3" htmlFor="description">Description: </label>
                            <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-8" rows={4} id="description" name="description"/>
                        </form>
                        <form className="row" action="">
                            <label htmlFor="difficultySelect" className="form-label col-3">Difficulty</label>
                            <select 
                            onChange={(e) => setDifficulty(e.target.value)}
                            value={difficulty}
                             className="col-8" id="difficultySelect" name="difficulty">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </form>
                        <form className="row" action="">
                            <label className="col-3" htmlFor="languageSelect">Language: </label>
                            <select
                                onChange={(e) => setLanguage(e.target.value)}
                                value={language}
                                className="col-8" id="languageSelect" name="language">
                                <option value="Python">Python</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>
                        </form>

                        <form className="row" action="">
                            <label className="col-3" htmlFor="testNo">Test No.: </label>
                            <input onChange={handleTestsNumberChange} className="col-8" min={0} max={10} type="number"
                                   id="testNo" name="testNo"/>
                        </form>

                        <form className="row" action="">
                            {
                                [...Array(numberOfTests)].map((_, index) => {
                                return (
                                    <React.Fragment key={`addtests${index}`}>
                                        <label className="col-3" htmlFor="input1">{`Test ${index + 1}: `}</label>
                                        <textarea 
                                        onChange={(e) => {
                                            let newTests = JSON.parse(JSON.stringify(tests));
                                            newTests[index].input = e.target.value;
                                            setTests(newTests);
                                        }}
                                        value={tests[index].input}
                                        className="col-4 testsInput" id="input1" name={`input${index}`} placeholder="Input"/>

                                        <textarea 
                                        onChange={(e) => {
                                            let newTests = JSON.parse(JSON.stringify(tests));
                                            newTests[index].output = e.target.value;
                                            setTests(newTests);
                                        }}
                                        value={tests[index].output}
                                        className="col-4 testsOutput" id="output1" name={`output${index}`} placeholder="Output"/>
                                    </React.Fragment>
                                )
                            })
                        }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit} type="button" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}