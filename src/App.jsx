import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrossClimbGame from './pages/CrossClimbGame';
import CrossClimbGame1 from './pages/CrossClimbGame1';
import CrossClimbGame2 from './pages/CrossClimbGame2';
import HomePage from './pages/HomePage';
import SuccessPage from './components/SuccessPage';
import SuccessPage1 from './components/SuccessPage1';
import VictoryPage from './components/VictoryPage';
import { TimerProvider } from './contexts/TimerContext';

function App() {
  return (
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/game" element={<CrossClimbGame/>} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/level2" element={<CrossClimbGame1 />} />
          <Route path="/success1" element={<SuccessPage1 />} />
          <Route path="/level3" element={<CrossClimbGame2 />} />
          <Route path="/victory" element={<VictoryPage />} />
        </Routes>
      </Router>
    </TimerProvider>
  );
}
export default App;
