// src/components/ResultsPopup.tsx
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styled from 'styled-components';

interface TestResult {
    _id: string;
    body: string;
    passed: boolean;
}

interface ResultsPopupProps {
    testResults: TestResult[] | undefined;
    isOpen: boolean;
    onClose: () => void;
}

const ResultsPopup: React.FC<ResultsPopupProps> = ({ testResults, isOpen, onClose }) => {
    return (
        <Popup open={isOpen} closeOnDocumentClick onClose={onClose} modal nested>
            <StyledPopup>
                <h1>Test Results:</h1>
                {testResults?.map((result) => (
                    <p key={result._id}>
                    Test: {result.passed ? 'Passed' : 'Failed'}
                    </p>
                ))}
                <CloseButton onClick={onClose}>Close</CloseButton>
            </StyledPopup>
        </Popup>
    );
};

const StyledPopup = styled.div`
  background-color: #4f5860;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ResultsPopup;
