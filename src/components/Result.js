import React, { useContext, useState } from 'react';
import axios from 'axios';
import DataContext from '../context/dataContext';
import Leaderboard from './Leaderboard';

const Result = () => {
    const { showResult, quizs, marks, startOver } = useContext(DataContext);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleUsernameSubmit = async () => {
        if (!username.trim()) {
            setMessage('Username cannot be empty.');
            return;
        }

        try {
            const response = await axios.post(`https://quizai-1.onrender.com/api/user/register`, {
                user: username
            });
            setMessage(response.data.message || 'Score submitted successfully!');
        } catch (error) {
            setMessage('Failed to submit score. Please try again later.');
        }
    };

    return (
        <section className="bg-dark text-white" style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <div className={`text-light text-center p-5 rounded ${marks > (quizs.length * 5 / 2) ? 'bg-success' : 'bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks > (quizs.length * 5 / 2) ? 'Awesome!' : 'Oops!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {quizs.length * 5}</h3>

                            <button onClick={startOver} className='btn py-2 px-4 btn-light fw-bold d-inline'>Start Over</button>

                            {marks === 50 && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <button
                                        onClick={handleUsernameSubmit}
                                        className="btn py-2 px-4 btn-primary fw-bold"
                                    >
                                        Submit
                                    </button>
                                    {message && <p className="mt-3">{message}</p>}
                                </div>
                            )}
                            <Leaderboard/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;
