import React from 'react';
import axios from 'axios';
export default function UserCard({user, setUsers}){

    const cardStyle = {
        padding: '10px',
        boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1)',
        width: '300px',
        margin: '10px 0',
        position: 'relative'
    }

    const deleteUser = (id) =>{
        axios.delete(`http://localhost:8080/users/${id}`).then(res=>{
            setUsers(res.data)
        })
    }


    return (
        <div style={cardStyle} className="user-card">
            <button onClick={()=>{
                deleteUser(user.id)
            }} className="delete-button">X</button>
            <div className="name">
            Name: {user.name}
            </div>
            <div className="bio">
            Bio: {user.bio}
            </div>
        </div>
    )

}