import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Builder from './components/Builder/Builder';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={Login} />
        <Route exact path='/app' component={Builder} />
      </Router>
    </div>
  );
}

export default App;
