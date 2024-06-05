import { FaLaptopCode, FaRegFileCode, FaTrophy, FaUser } from "react-icons/fa6";
import '../../style/home.css';
import { useNavigate } from "react-router";
import { getEmail } from "../../UserData";

export const Home = () => {
    let navigate = useNavigate();


    return (
      <>
        
        <div className="home-container">
            <div className="home-header">
                <h1>Code Learning</h1>
            </div>
            <div className="options-container row">
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
                 className="option col-5">
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
                    <FaRegFileCode />
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