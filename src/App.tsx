import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormBuilder from './components/Builder';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Привет</h1>
          <Link to="/form">
            <button>FORM</button>
          </Link>
        </header>
        <Routes>
          <Route path="/form" element={<FormBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;