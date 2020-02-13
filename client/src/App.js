import React, {useEffect, useState} from 'react';
import './App.css';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm';
import axios from 'axios';




function App() {

  const [users, setUsers] = useState([]);


  useEffect(()=>{
    console.log('this a loop?')
    axios.get('http://localhost:8080/users').then(res=>{
      setUsers(res.data)
    })
  }, [])

  const updateUsers = (data) =>{
    setUsers([...users, data])
  }

  return (
    <div className="App">
      <UserForm updateUsers={updateUsers}/>
      <div className="user-list">
      {users.map(u=>{
        return <UserCard setUsers={setUsers} user={u} key={u.id}/>
      })}

      </div>
    </div>
  );
}

export default App;
