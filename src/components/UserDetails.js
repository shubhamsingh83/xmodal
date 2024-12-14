import React from 'react';
import "../styles/UserDetails.css"

const UserDetails = ( {id, name, email, phone , dob, state, city, handleEditMode,handleUserDelete }) => {
  const setEditMode = ()=>{
     handleEditMode(id);
  }

const triggerUserDelete = ()=>{
    handleUserDelete(id)
}
  return (
    <div className="user-card">
        <span>{name}</span>
    
        <span className='email'>{email}</span>
    
         <span>{phone}</span>
    
         <span>{dob}</span>
    

        <span>{state}</span>
    
         <span>{city}</span>

         

         <span className='btn'>
          <button onClick={setEditMode} className='btn-edit'>Edit</button>
          <button onClick={triggerUserDelete} className='btn-delete'>Delete</button>
          </span>

    
    </div>
  );
};

export default UserDetails;
