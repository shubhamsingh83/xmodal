import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../utils/getUser";
import { useSnackbar } from "notistack";


function Form({ onClose ,handleUpdateUser, userId, isEditMode,users}) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    state: "",
    city: "",
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        console.log(response.data);
        const data = response.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          dob: data.dob || "",
          phone: data.phone || "",
          state: data.state || "",
          city: data.city || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    if (isEditMode) {
      fetchUserData();
    }
  }, [isEditMode, userId]);
  
  

  const statesAndCities = {
    "Andhra Pradesh": ["Amaravati", "Visakhapatnam", "Vijayawada", "Guntur", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila", "Naharlagun"],
    "Assam": ["Dispur", "Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Durg", "Korba", "Bilaspur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Pernem"],
    "Gujarat": ["Gandhinagar", "Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Karnal", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamsala", "Kullu", "Solan"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Giridih"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kottayam", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Kakching", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Rangpo", "Jorethang"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
    "Telangana": ["Hyderabad", "Warangal", "Khammam", "Nizamabad", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Roorkee"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
  };

  const changeUsers = (users) =>{
    handleUpdateUser(users)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "state" && { city: "" }), 
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
   

    if(formData.name.length < 6){
      enqueueSnackbar(
        "Username must be at least 6 characters" ,
       { variant:"warning"}
      )
      return false;
    }


    if (formData.phone.length !== 10) {
      enqueueSnackbar(
        "Invalid phone number. Please enter a 10-digit phone number.",
          {variant:"warning"}
      )
      return false;
    }

    if(formData.email.length === 0 || !formData.email.includes("@",".com")){
       enqueueSnackbar(
        "Please enter a Valid mail.",
        {variant:"warning"}
       );
       return false;
    }
  
    // Validate DOB
    const DOB = new Date(formData.dob);
    const currentDate = new Date();
  
    if (DOB > currentDate) {
      enqueueSnackbar(
        "Invalid date of birth. Date of birth cannot be in the future.",
        {variant:"warning"}
      );
      return;
    }

    console.log(users);
    console.log(formData);
    const isUserNameExists = users.find(user=>user.name.toLowerCase() === formData.name.toLowerCase());
    const isUserEmailExists = users.find(user=>user.email.toLowerCase() === formData.email.toLowerCase())
    if(isUserNameExists  ){
      enqueueSnackbar(
        "Username already exists",
        {variant:"error"}
      );
      return;
    }

    if(isUserEmailExists ){
      enqueueSnackbar(
        "Email already exists",
        {variant:"error"}
      );
      return;
    }
    

   if(isEditMode){
    try{
      const response = await axios.put(`http://localhost:8080/users/${userId}`,formData)

   }catch(error){
        console.log(error);
   }
   
   enqueueSnackbar(
    "Form Updated successfully!",
    {variant:"success"}
  );
   }
   else{
    try{
      const response = await axios.post("http://localhost:8080/users",formData)
      console.log(response);
   }catch(error){
    if(e.response.status === 400){
      enqueueSnackbar(
        e.response.data.message,
       { variant:"error"}
      )
  } 
  else{
    enqueueSnackbar(
      'Something went wrong. Check that the backend is running, reachable and returns valid JSON',
     { variant:"error"}
    )
  }
   }
   
   enqueueSnackbar(
    "Form Submited successfully!",
    {variant:"success"}
  );
   }

  
  
    try {
       const response =  await getUsers();
       changeUsers(response.data);

    } catch (error) {
      console.log(error);
    }


   
  
   
    // const oldFormdata = JSON.parse(localStorage.getItem("formData")) || [];
  
   
    // oldFormdata.push(formData);
  
    
    // localStorage.setItem("formData", JSON.stringify(oldFormdata));
  
    // const users = JSON.parse(localStorage.getItem("formData")) || [];
    // console.log("Retrieved users:", users);
  
 
    // setFormData({
    //   name: "",
    //   phone: "",
    //   dob: "",
    // });

    onClose();
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      dob: "",
      phone: "",
      state: "",
      city: "",
    }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="name"
          id="username"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="state">State:</label>
        <select
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select a state</option>
          {Object.keys(statesAndCities).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="input-field">
        <label htmlFor="city">City:</label>
        <select
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.state}
          required
        >
          <option value="">Select a city</option>
          {formData.state &&
            statesAndCities[formData.state].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>
      </div>
      <div className="input-field mt-5">
        <button type="submit" className="submit submit-button">
          Submit
        </button>
        <button
          type="button"
          className="reset reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default Form;
