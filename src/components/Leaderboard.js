import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    let response;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                response = await axios.get(`http://localhost:8800/api/user/showuser`);
                setUsers(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                setError('Failed to fetch leaderboard data. Please try again later.');
            }
        };

        fetchUsers();
    }, [response]);

    return (
        <section className="bg-light text-dark py-5">
            <div className="container">
                <h1 className="text-center mb-4">Leaderboard</h1>

                {error && <p className="text-danger text-center">{error}</p>}

                {!error && users.length > 0 ? (
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Username</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !error && <p className="text-center">Loading leaderboard...</p>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;