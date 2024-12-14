import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import "./styles/App.css";
import { getUsers } from "./utils/getUser";
import UserDetails from "./components/UserDetails";
import UserDetailsHeading from "./components/UserDetailsHeading";
import axios from "axios";
import { useSnackbar } from "notistack";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const[users,setUsers] = useState([]);
  const[isEditMode, setEditMode] = useState(false);
  const [userId,setUserId] = useState("");
   const { enqueueSnackbar } = useSnackbar();


  const fetchUsers = async ()=>{
    try {
      const response = await getUsers();
      setUsers(response.data);

    } catch (error) {
      console.log(error);

    }
   
   }

   useEffect(()=>{
    
    fetchUsers();
 },[])

  const updateUser =  (users) =>{
     setUsers(users);
  }

  const handleEditMode = (id) => {
     setEditMode(true);
    setUserId(id);
     console.log(userId);
     setIsOpen(true);
     
  }

  const handleModalOpen = () =>{
     setIsOpen(false);
     setEditMode(false);
     setUserId("");
  }

  const handleUserDelete = async(id) =>{
    try {
        await axios.delete(`http://localhost:8080/users/${id}`)
        enqueueSnackbar(
          "User Deleted successfully!",
          {variant:"success"}
        );
         fetchUsers();
    } catch (error) {
      console.log(error);
    }
     const filteredUser = users.filter(user => user.id !== id);
     setUsers(filteredUser);
  }
      

 
  return (
    <div className="app">
      <h1>User Details Form</h1>
      <button className="btn-open" onClick={() => setIsOpen(true)}>
        Open Form
      </button>
      {isOpen && <Modal onClose={handleModalOpen}  handleUpdateUser = {updateUser}  userId={userId}  isEditMode={isEditMode}/>}
        <div className="edit-container">
        <UserDetailsHeading/>
        <div className="usersList">
          {users && users.map((user,index)=>
              <div key={index}><UserDetails {...user} handleEditMode = {handleEditMode}  handleUserDelete = {handleUserDelete} /></div>
          )}
        </div> 
        </div>
    </div>
  );
}

export default App;
