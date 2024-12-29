import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
    const [quizs, setQuizs] = useState([]);
    const [question, setQuesion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    // const [correctAnswer, setCorrectAnswer] = useState('');
    const [userAns, setUserAns] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [marks, setMarks] = useState(0);

    // Display Controlling States
    const [showStart, setShowStart] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Load JSON Data
    useEffect(() => {
        fetch('quiz.json')
            .then(res => res.json())
            .then(data => setQuizs(data));
    }, []);

    // Set a Single Question
    useEffect(() => {
        if (quizs.length > questionIndex) {
            setQuesion(quizs[questionIndex]);
        }
    }, [quizs, questionIndex]);

    // Start Quiz
    const startQuiz = () => {
        setShowStart(false);
        setShowQuiz(true);
        setUserAns([]);
    };

    // Check Answer
    const checkAnswer = (event, selected) => {
        if (!selectedAnswer) {
            // setCorrectAnswer(question.answer);
            setSelectedAnswer(selected);

            setUserAns((prev) => [...prev, selected]);

            event.target.classList.add('bg-secondary');
            // if (selected === question.answer) {
            //     setMarks(marks + 5);
            // } else {
            //     event.target.classList.add('bg-secondary');
            // }
        }
    };

    // Next Question
    const nextQuestion = () => {
        // setCorrectAnswer('');
        setSelectedAnswer('');
        const btn = document.querySelector('button.bg-secondary');
        btn?.classList.remove('bg-secondary');
        setQuestionIndex(questionIndex + 1);
    };

    // Show Result
    const showTheResult = async () => {
        setShowResult(true);
        setShowStart(false);
        setShowQuiz(false);

        // Send user answers to the backend
        try {
            const response = await fetch('https://quizai-1.onrender.com/api/user/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userAns }),
            });

            const data = await response.json();
            if (response.ok) {
                setMarks(data.score); // Update marks with the calculated score
            } else {
                alert('Error calculating score from the server.');
            }
        } catch (error) {
            console.error('Error sending answers to backend:', error);
        }
    };

    // Start Over
    const startOver = () => {
        setShowStart(false);
        setShowResult(false);
        setShowQuiz(true);
        // setCorrectAnswer('');
        setSelectedAnswer('');
        setUserAns([]);
        setQuestionIndex(0);
        setMarks(0);
        const btn = document.querySelector('button.bg-secondary');
        btn?.classList.remove('bg-secondary');
    };

    return (
        <DataContext.Provider
            value={{
                startQuiz,
                showStart,
                showQuiz,
                question,
                quizs,
                checkAnswer,
                // correctAnswer,
                selectedAnswer,
                questionIndex,
                nextQuestion,
                showTheResult,
                showResult,
                marks,
                startOver,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
