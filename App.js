import React from 'react';
import { TodoProvider } from './src/TodoContext';
import HomeScreen from './src/HomeScreen';

const App = () => {
  return (
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );
};

export default App;
