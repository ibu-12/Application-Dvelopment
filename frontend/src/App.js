import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/Login';
import RegistrationForm from './components/Register';

function App() {
  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
      <RegistrationForm />
      
      <LoginForm/>
      
    </div>
  );
}

export default App;
