import React, { Fragment, useState } from 'react';
import  axios  from 'axios';

const Loan = (props) => {

  const [formData, setFormData] = useState(
    {
      firstName: '',
      lastName: '',
      city: '',
      mobileNumber: ''
    }
  );

  const {firstName, lastName, city, mobileNumber} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const style = {
    width: "400px",
    margin: "20px",
    display: "inline-block"
  }

  const onSubmit = async e => {
    e.preventDefault();

    const req_body = {
      number: mobileNumber
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const body = JSON.stringify(req_body);
    const res = await axios.post('http://localhost:9999/register', body, config);

    console.log(res);
    const req_id = res.data.request_id;

    const data = {
      firstName,
      lastName,
      city,
      mobileNumber,
      req_id 
    }


    if(res.data.status==="0"){
      props.history.push({
        pathname: './pin',
        state: { data }
      });
    }else{
      props.history.push({
        pathname:'./otperror',
        state: { message:'Phone no. already in queue.' }
      });
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary text-center">Personal Loan</h1>
      <p className="lead text-center">Share your details below to proceed further</p>
      
      <form className="form text-center"  onSubmit = {e=>onSubmit(e)}>
        <input
            type="text"
            placeholder="First Name as per PAN"
            name="firstName"
            style = {style}
            onChange ={e => onChange(e)}
            required
        />
        <input
            type="text"
            placeholder="Last Name as per PAN"
            name="lastName"
            style = {style}
            onChange ={e => onChange(e)}
            required
        />
        <input
            type="text"
            placeholder="City"
            name="city"
            style = {style}
            onChange ={e => onChange(e)}
            required
        />
        <input
            type="text"
            placeholder="Mobile Number (along with country code)"
            name="mobileNumber"
            style = {style}
            onChange ={e => onChange(e)}
            required
        />
        <br></br>
        
          <input type="submit"  className="btn btn-primary" style = {style} value="Get OTP" />
      </form>
      
    </Fragment>
  )
}


export default Loan;
