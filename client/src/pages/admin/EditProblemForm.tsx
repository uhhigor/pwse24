import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style/ProblemForms.css"


export const EditProblemForm = ({setTasks, setOldTests, editingTask, existingTests}: any) => {

    const [name, setName] = useState(editingTask?.name ?? '');
    const [difficulty, setDifficulty] = useState(editingTask?.difficulty ?? 'Easy');
    const [deadline, setDeadline] = useState(editingTask?.deadline ?? '');
    const [description, setDescription] = useState(editingTask?.description ?? '');
    const [numberOfTests, setNumberOfTests] = useState(editingTask?.tests.length ?? 1);
    const [tests, setTests] = useState([{'input': '', 'output': ''}]);

    const handleTestsNumberChange = (e: any) => {
        const num = parseInt(e.target.value, 10);
        if (num > 0 && num <= 10) {
            setNumberOfTests(num);
            const newTests = Array(num).fill({'input': '', 'output': ''});
            setTests(newTests);
        }
    }

    useEffect(() => {
        setName(editingTask?.name ?? '');
        setDifficulty(editingTask?.difficulty ?? 'Easy');
        setDeadline(editingTask?.deadline ?? '');
        setDescription(editingTask?.description ?? '');
        setNumberOfTests(editingTask?.tests.length ?? 1);

        const newTests: any = [];
        if (editingTask) {
            for (const test of editingTask?.tests) {
                const existingTest = existingTests.find((t: any) => {
                    return t._id === test;
                })
                newTests.push(existingTest);
            }
        }
        setTests([...newTests]);

    }, [editingTask])

    const handleEdit = () => {
        console.log(editingTask);
        axios.put(process.env.REACT_APP_API_ADDRESS + "/admin/editTask/" + editingTask._id, {
            name: name,
            difficulty: difficulty,
            deadline: deadline,
            description: description,
            tests: tests
        })
        .then((response) => {
            if (response.status === 200) {
                axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tasks")
                    .then((response) => {
                        setTasks(response.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                axios.get(process.env.REACT_APP_API_ADDRESS + "/admin/tests")
                    .then((response) => {
                        setOldTests(response.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="modal fade editProblem-container" id="editProblem" tabIndex={-1} aria-labelledby="editProblemLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editProblemLabel">Edit task</h5>
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
                            <label className="col-3" htmlFor="deadline">Deadline: </label>
                            <input
                            onChange={(e) => setDeadline(e.target.value)}
                            value={deadline}
                            className="col-8" type="date" id="deadline" name="deadline"/>
                        </form>
                        
                        <form className="row" action="">
                            <label className="col-3" htmlFor="testNo">Test No.: </label>
                            <input onChange={handleTestsNumberChange}
                            value={numberOfTests}
                            className="col-8" min={0} max={10} type="number" id="testNo" name="testNo"/>
                        </form>

                        <form className="row" action="">
                        {
                            [...Array(numberOfTests)].map((_, index) => {
                                return (
                                    <React.Fragment key={`tests ${index}`}>
                                        <label className="col-3" htmlFor="input1">{`Test ${index + 1}: `}</label>
                                        <textarea
                                        onChange={(e) => {
                                            let newTests = JSON.parse(JSON.stringify(tests));
                                            newTests[index].input = e.target.value;
                                            setTests(newTests);
                                        }}
                                        value={tests[index]?.input}
                                        className="col-4 testsInput" name={`input${index}`} placeholder="Input"/>

                                        <textarea 
                                        onChange={(e) => {
                                            let newTests = JSON.parse(JSON.stringify(tests));
                                            newTests[index].output = e.target.value;
                                            setTests(newTests);
                                        }}
                                        value={tests[index]?.output}
                                        className="col-4 testsOutput" name={`output${index}`} placeholder="Output"/>
                                    </React.Fragment>
                                )
                            })
                        }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleEdit} type="button" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}