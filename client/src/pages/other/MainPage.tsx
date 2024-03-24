import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../style/MainPage.css';

const MainPage: React.FC = () => {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    let navigate = useNavigate();

    const handleButtonHover = () => {
        setIsButtonHovered(true);
    };

    const handleButtonLeave = () => {
        setIsButtonHovered(false);
    };

    const goToLoginPage = () => {
        const path = `/login`;

        navigate(path);
    };
    const goToRegisterPage = () => {
        const path = `/register`;
        navigate(path)
    };

    return (
        <div className={"MainPage"}>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-center">
                            <div className={`welcomeText ${isButtonHovered ? 'paused' : ''}`}>Welcome to Code
                                Learning!
                            </div>
                            <button
                                className="btn btn-lg text-white m-5"
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                onClick={goToRegisterPage}
                            >
                                Register here!
                            </button>
                            <button
                                className="btn btn-lg text-white m-5"
                                onMouseEnter={handleButtonHover}
                                onMouseLeave={handleButtonLeave}
                                onClick={goToLoginPage}
                            >
                                Log in here!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;