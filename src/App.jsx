import { useState } from 'react';
import TimerDisplay from './timer/TimerDisplay.jsx'; // Import TimerDisplay component
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <TimerDisplay title="Timer" />
  );
}

export default App;
