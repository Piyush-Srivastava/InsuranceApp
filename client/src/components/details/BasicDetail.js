import React,{Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

 const BasicDetail = () => {
    const [formData, setFormData]=useState(
        {
          FirstName:'',
          MiddleName:'',
          LastName:'',
          email:'',
          dob:'',
          pan:'',
          pincode:'',
          emp_type: '',
          income:''
        }
        
      ); 
    
    const{FirstName,MiddleName,LastName, email, emp_type, dob, pan, pincode, experience, income}=formData;
    
    const onChange=e=>setFormData({...formData,[e.target.name]:e.target.value});
    
      const onSubmit = async e => {
        e.preventDefault();
       
          
        console.log("submitted basic details");
      };
    
    
    return (
        <Fragment>
            <h1 className="large text-primary">Tell Us About You</h1>
            <small className="form-text"
            ><b>Note: </b>Please provide your details as per your PAN card</small
          >
      
      <form className="form" onSubmit={e=> onSubmit(e)}>
          
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
    <select class="form-control" onChange = {e => onChange(e)} name="emp_type" id="exampleFormControlSelect1">
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
           min="1900-01-01" max="2020-01-18"></input>
           </div>
    
           <div className="form-group">Telephone: <input type="tel" name="usrtel"/></div>
           
       
        <div className="form-group">
          <input
            type="text"
            placeholder="Personal PAN"
            name="pan"
            Length="4"
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
          />
          </div>
    
          <fieldset class="form-group" value={experience} name="experience" onChange = {e => onChange(e)}>
        <div class="row">
          <legend class="col-form-label col-sm-2 pt-0">Total Experience</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
              <label class="form-check-label" for="gridRadios1">
                0 to 2 Years
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
              <label class="form-check-label" for="gridRadios2">
              3 to 4 Years
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3"/>
              <label class="form-check-label" for="gridRadios3">
              5 and above
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <div className="form-group">
          <input type="text" placeholder={ emp_type==="emp"? "Monthly Sal":"Annual Income"} name="income" value={income} onChange={e=> onChange(e) } required />
      </div>

      <input type="submit" className="btn btn-primary" value="Next" />
      </form>
        </Fragment>
    );
    
}
export default BasicDetail
