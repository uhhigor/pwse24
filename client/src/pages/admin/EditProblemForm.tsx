import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../style/ProblemForms.css"


export const EditProblemForm = ({setTasks, setOldTests, editingTask, existingTests}: any) => {

    const [name, setName] = useState(editingTask?.name ?? '');
    const [difficulty, setDifficulty] = useState(editingTask?.difficulty ?? 'Easy');
    const [language, setLanguage] = useState(editingTask?.language ?? 'Python');
    const [description, setDescription] = useState(editingTask?.description ?? '');
    const [numberOfTests, setNumberOfTests] = useState(editingTask?.tests.length ?? 1);
    const [tests, setTests] = useState([{ givenInput: '', expectedOutput: '' }]);

    const handleTestsNumberChange = (e: any) => {
        const num = parseInt(e.target.value, 10);
        if (num > 0 && num <= 10) {
            setNumberOfTests(num);
            setTests(prevTests => {
                const newTests = [...prevTests];
                if (num > prevTests.length) {
                    for (let i = prevTests.length; i < num; i++) {
                        newTests.push({ givenInput: '', expectedOutput: '' });
                    }
                } else {
                    newTests.length = num;
                }
                return newTests;
            });
        }
    };


    useEffect(() => {
        setName(editingTask?.name ?? '');
        setDifficulty(editingTask?.difficulty ?? 'Easy');
        setLanguage(editingTask?.language ?? 'Python');
        setDescription(editingTask?.description ?? '');
        setNumberOfTests(editingTask?.tests.length ?? 1);

        const newTests = [];
        if (editingTask) {
            for (const test of editingTask.tests) {
                const existingTest = existingTests.find((t: any) => {
                    return t._id === test;
                })
                newTests.push(existingTest || { givenInput: '', expectedOutput: '' });
            }
        }
        setTests(newTests.length ? newTests : [{ givenInput: '', expectedOutput: '' }]);
    }, [editingTask, existingTests]);


    const handleEdit = () => {
        //console.log(editingTask);
        axios.put(process.env.REACT_APP_API_ADDRESS + "/task/" + editingTask._id, {
            name: name,
            difficulty: difficulty,
            language: language,
            description: description,
            tests: tests
        })
        .then((response) => {
            if (response.status === 200) {
                axios.get(process.env.REACT_APP_API_ADDRESS + "/task/")
                    .then((response) => {
                        setTasks(response.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                axios.get(process.env.REACT_APP_API_ADDRESS + "/tasktest/")
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


    const handleRemoveTest = (index : any) => {
        setTests(prevTests => {
            const newTests = [...prevTests];
            newTests.splice(index, 1);
            return newTests;
        });
        setNumberOfTests((prevNumberOfTests : any) => prevNumberOfTests - 1);
    };

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
                            <label htmlFor="languageSelect" className="form-label col-3">Language: </label>
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
                            <input onChange={handleTestsNumberChange}
                                   value={numberOfTests}
                                   className="col-8" min={0} max={10} type="number" id="testNo" name="testNo"/>
                        </form>

                        <form className="row" action="">
                            {
                                tests.map((test, index) => (
                                    <React.Fragment key={`tests ${index}`}>
                                        <label className="col-2" htmlFor={`input${index}`}>{`Test ${index + 1}: `}</label>
                                        <textarea
                                            onChange={(e) => {
                                                const newTests = [...tests];
                                                newTests[index].givenInput = e.target.value;
                                                setTests(newTests);
                                            }}
                                            value={test.givenInput}
                                            className="col-3 testsInput"
                                            name={`input${index}`}
                                            placeholder="Input"
                                        />
                                        <textarea
                                            onChange={(e) => {
                                                const newTests = [...tests];
                                                newTests[index].expectedOutput = e.target.value;
                                                setTests(newTests);
                                            }}
                                            value={test.expectedOutput}
                                            className="col-3 testsOutput"
                                            name={`output${index}`}
                                            placeholder="Output"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger col-2"
                                            onClick={() => handleRemoveTest(index)}
                                        >
                                            Delete
                                        </button>
                                    </React.Fragment>
                                ))
                            }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleEdit} type="button" className="btn btn-success"
                                data-bs-dismiss="modal">Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}