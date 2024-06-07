import {FaLaptopCode, FaRegFileCode, FaTrophy, FaUser} from "react-icons/fa6";
import '../../style/home.css';
import {useNavigate} from "react-router";
import {getEmail} from "../../UserData";
import {CgLogOut} from "react-icons/cg";
import axios from "axios";

export const Home = () => {
    let navigate = useNavigate();

    const deleteCookie = (name: string, path: string = '/'): void => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    };
    const logOut = (): void => {
        delete axios.defaults.headers.common['Authorization'];
        deleteCookie('token');
        localStorage.clear();
        window.location.href = '/login';
    };


    return (
        <>

            <div className="home-container">
                <div className="row home-header">
                    <div className=" col-1">
                        <CgLogOut size={80} className="logOuticon" onClick={logOut}/>
                    </div>

                    <div className="col-11">
                        <h1>Code Learning</h1>
                    </div>
                </div>
                <div className="options-container row ">
                    <div className="option col-5">
                        <FaUser
                            onClick={() => {
                                navigate(`/profileManagement/${encodeURIComponent(getEmail() as string)}`)
                            }}
                        />
                        <span
                            onClick={() => {
                                navigate(`/profileManagement/${encodeURIComponent(getEmail() as string)}`)
                            }}
                        >Profile</span>
                    </div>
                    <div
                        className="option col-5 ">
                        <FaLaptopCode
                            onClick={() => {
                                navigate("/tasks")
                            }}
                        />
                        <span
                            onClick={() => {
                                navigate("/tasks")
                            }}
                        >Problems</span>
                    </div>
                    <div className="option col-5">
                        <FaRegFileCode/>
                        <span>Submissions</span>
                    </div>
                    <div
                        className="option col-5">
                        <FaTrophy
                            onClick={() => {
                                navigate("/ranking")
                            }}
                        />
                        <span
                            onClick={() => {
                                navigate("/ranking")
                            }}
                        >Ranking</span>
                    </div>
                </div>
            </div>
        </>
    );
}