import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Ranking = () => {

    const [users, setUsers] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_ADDRESS + "/users/")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error(err);
                if (err.response.status === 401) {
                    navigate('/login');
                }
            });
    }, []);

    const usersWithTotalScores = users?.map((user: any) => {
        const totalScore = user.tasksSolutions.reduce(
          (sum: number, taskSolution: any) => sum + taskSolution.score,
          0
        );
        return { ...user, totalScore };
    });

    const sortedUsers = usersWithTotalScores?.sort(
    (a: any, b: any) => b.totalScore - a.totalScore
    );

    return (
        <>
            <div className="TaskPage">
                <div className="row">
                    <div className="col">
                        <div className="table-container">
                            <h2>Ranking</h2>
                            <div className='table-responsive'>
                                <table className=" table table-borderless">
                                    <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Points</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sortedUsers?.map((user: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.surname}</td>
                                                        <td>{user.totalScore}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Link to={'/home'} className="btn ms-3 goToDashboardButton">Go to home</Link>
                </div>
            </div>
        </>
    )
}