import React, { useContext } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import DataContext, { DataProvider } from './context/dataContext';
import Leaderboard from './components/Leaderboard';

function App() {
    const { marks } = useContext(DataContext);

    return (
        <DataProvider>
            {/* Welcome Page */}
            <Start />

            {/* Quiz Page */}
            <Quiz />

            {/* Result Page */}
            <Result />

        </DataProvider>
    );
}

export default App;
