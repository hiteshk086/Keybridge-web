import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from './screen/Form';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
      <Route path="/" Component={Form} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
