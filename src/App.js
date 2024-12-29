import React, { useContext } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import DataContext, { DataProvider } from './context/dataContext';

function App() {

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
