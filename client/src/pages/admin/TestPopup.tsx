import axios from "axios";
import React, { useEffect, useState } from "react";

export const TestPopup = ({ test }: any) => {

    return (
        <div className="modal fade" id="test" tabIndex={-1} aria-labelledby="testLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="testLabel">Test information</h5>
                        <button type="button" className="btn-close danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-3">Input: </div>
                            <div className="col-6">{test.input}</div>
                        </div>
                        <div className="row">
                            <div className="col-3">Output: </div>
                            <div className="col-6">{test.output}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}