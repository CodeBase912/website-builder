import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Custom React Components
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Builder from "./pages/builder/Builder";
import WebXProvider from "./pages/builder/state";

function App() {
  return (
    <WebXProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/builder" element={<Builder />} />
          </Routes>
        </div>
      </Router>
    </WebXProvider>
  );
}

export default App;
