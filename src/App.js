import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    const DOB = new Date(formData.date);

    const currentDate = new Date();

    if (DOB > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
    }

    setFormData({
      name: "",
      email: "",
      dob: "",
      phone: "",
    });
  };

  return (
    <div className="app">
      <h1>User Details Form</h1>{" "}
      <button className="btn-open" onClick={(e) => setIsOpen(true)}>
        Open Form
      </button>
      {isOpen && (
        <div onClick={(e) => setIsOpen(false)} className="popup-box modal ">
          <div onClick={(e) => e.stopPropagation()} className="box">
            <h3>Fill Details</h3>
            <div className="modal-content">
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
                    type="email"
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
                  <label htmlFor="dob">Username</label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-field mt-5">
                  <button type="submit" className="submit submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;