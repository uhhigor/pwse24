import React from 'react';
import {useParams} from "react-router";
import "../../style/ProblemPage.css";
import CodeEditor from "../../CodeEditor";

const ProblemPage: React.FC = () => {
    let index = useParams().id;

    return (
        <div className="problemPage-container">
            <h1 className="my-5">Problem {index}</h1>
            <div className="row">
                <p>Name: </p>
                <p>Difficulty: </p>
                <p>Time remaining: </p>
                <p>Description: And I promise you I'll never desert you again because after 'Salome' we'll make another
                    picture and another picture. You see, this is my life! It always will be! Nothing else! Just us, and
                    the cameras, and those wonderful people out there in the dark!... All right, Mr. DeMille, I'm ready
                    for my close-up.</p>
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
                        <p>Test 1</p>
                        <p>Test 2</p>
                        <p>Test 3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
