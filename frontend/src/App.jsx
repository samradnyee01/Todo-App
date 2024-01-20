import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import './App.css'
import { Todos } from './components/Todos'
import Signup from './components/Signup';
import Appbar from './components/Appbar';
import Signin from './components/Signin';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  const [todos,setTodos]=useState([]);
  fetch("http://localhost:3000/todo")
  .then(async function(res){
    const json = await res.json();
    setTodos(json.todos);
  })
  return (
    <div>
      <Appbar/> 
    <Router>
      <Routes>
        <Route path="/addtodo" element={<CreateTodo/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/> 
      </Routes>
    </Router>
    </div>
  )
}

export default App
