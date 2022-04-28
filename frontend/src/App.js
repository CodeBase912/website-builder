import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Import Custom React Components
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Builder from "./pages/builder/Builder";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
