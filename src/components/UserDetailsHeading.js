import React from 'react';
import "../styles/UserdetailsHeading.css";

const UserDetailsHeading = () => {
    const heading = ["UserName","Email Address","Mobile Number","Date of Birth","State","City","Actions"]
  return (
    <div className='header' >
        {heading.map((item,index)=>
               <span key={index} className={index === 1 ? 'email' : ''}>{item}</span>
    )

        }
    </div>
  )
}

export default UserDetailsHeading