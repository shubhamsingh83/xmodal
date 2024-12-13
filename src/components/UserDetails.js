import React from 'react';
import "../styles/UserDetails.css"

const UserDetails = ( {id, name, email, phone , dob, state, city, handleEditMode }) => {
  const setEditMode = ()=>{
     handleEditMode(id);
  }
  return (
    <div className="user-card">
        <span>{name}</span>
    
        <span className='email'>{email}</span>
    
         <span>{phone}</span>
    
         <span>{dob}</span>
    

        <span>{state}</span>
    
         <span>{city}</span>

         <span className='btn'><button onClick={setEditMode} className='btn-edit'>Edit</button></span>
    
    </div>
  );
};

export default UserDetails;
