import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Import Custom React Components
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
