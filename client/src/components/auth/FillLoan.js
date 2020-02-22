import React, {Fragment, useState} from 'react'
import axios from 'axios';

const FillLoan =(props) => {
  const [formData, setFormData]=useState(
    {
      FirstName: '',
      MiddleName: '',
      LastName: '', 
      email: '', 
      emp_type: '', 
      dob:'', 
      mobileNumber: '', 
      pan: '', 
      pincode: '', 
      experience: '', 
      income:''
    }
    
  ); 

  const {FirstName,MiddleName,LastName, email, emp_type, dob, mobileNumber, pan, pincode, experience, income}=formData;

  const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});

  let req_body = {
    FirstName,
    MiddleName,
    LastName, 
    email, 
    emp_type, 
    dob, 
    mobileNumber,
    pan, 
    pincode, 
    experience, 
    income
  }

    const onSubmit = async e => {
      e.preventDefault();

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      console.log(req_body);
      req_body = JSON.stringify(req_body);
      
      const res = await axios.post('/formDetails', req_body, config);

      // if(res.data.status==="1"){
      //   props.history.push({
      //     pathname:'./otperror',
      //     state: { message:'Phone no. already in queue.' }
      //   });
      // }
      
    };


  return (
      <Fragment>
          <h1 className="large text-primary">Tell Us About You</h1>
          <small className="form-text"><b>Note: </b>Please provide your details as per your PAN card</small
        >
    
    <form className="form" onSubmit={e => onSubmit(e)}>
        
      <div className="form-group">
        <input type="text" placeholder="First Name" name="FirstName" value={FirstName} onChange={e=> onChange(e) } required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Middle Name (Optional)" name="MiddleName" value={MiddleName} onChange={e=> onChange(e) } required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Last Name" name="LastName" value={LastName} onChange={e=> onChange(e) } required />
      </div>
      <div className="form-group">

      <div className="form-group">
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e) } required />
      </div>

  <label for="exampleFormControlSelect1">Employement Type</label>
  <select class="form-control" onChange = {e => onChange(e)} value={emp_type} name="emp_type" id="exampleFormControlSelect1">
    <option value = "self_emp">Self Employed</option>
    <option value ="emp">Salaried</option>
  </select>
  </div>



      <div className="form-group">
      <label for="start">Date of birth:</label>
      </div>

      <div className="form-group">
      <input type="date" id="dob" name="dob"
        value="yyyy-mm-dd" 
        min="1900-01-01" max="2020-01-18" onChange ={ e => onChange(e)} value ={dob}></input>
        </div>

        <div className="form-group">Telephone: <input type="text" name="mobileNumber" onChange ={ e => onChange(e)} value={mobileNumber}/></div>
        
    
      <div className="form-group">
        <input
          type="text"
          placeholder="Personal PAN"
          name="pan"
          Length="4"
          onChange = {e => onChange(e)}
          value={pan}
        />
        <small className="form-text"
          >Please enter your personal PAN number. the fourth character should be P.</small>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="current residance pincode"
          name="pincode"
          Length="6"
          onChange = {e => onChange(e)}
          value={pincode}
        />
        </div>

      <label for="exampleFormControlSelect1">Years of Experience</label>
      <select class="form-control" onChange = {e => onChange(e)} value={experience} name="experience" id="exampleFormControlSelect1">
          <option value = "0-2">0 to 2</option>
          <option value = "3-4">3 to 4</option>
          <option value = "5 and more"> > 5</option>
      </select>

      <div className="form-group">
        <input type="text" placeholder={ emp_type==="emp"? "Monthly Sal":"Annual Income"} name="income" value={income} onChange={e=> onChange(e) } required />
      </div>

    <input type="submit" className="btn btn-primary" value="Next" />
    </form>
      </Fragment>
  );
}

export default FillLoan;