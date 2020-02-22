import React, { Fragment, useState } from 'react';
import  axios  from 'axios';

const Pin = (props) => {

  const [formData, setFormData] = useState(
    {
      pin: ''
    }
  );

  const { pin } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const style = {
    width: "400px",
    margin: "20px",
    display: "inline-block"
  }

  const onSubmit = async e => {
    e.preventDefault();

    
    const req_body = {
      requestId: props.location.state.data.req_id,
      pin: pin
    }
    
    console.log(props); 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
    
    console.log(req_body);
    const body = JSON.stringify(req_body);
    console.log("BODY "+body);
    const res = await axios.post('http://localhost:9999/verify', body, config);

    const data = {
      ...props.location.state.data,
    }

    if(res.data.status==="0"){

      const{ firstName, lastName, city, mobileNumber} = props.location.state.data;
      let post_body = {
        firstName,
        lastName,
        city,
        mobileNumber
      };
      post_body = JSON.stringify(post_body);
      const res1 = await axios.post('/fillform', post_body, config)
    
      if(res1){
        props.history.push({
          pathname: './fillLoanForm',
          state: { message: 'verified'}
        });
      }
      console.log('correct');
    }else{
      props.history.push({
        pathname: './otperror',
        state: { message: 'Incorrect OTP' }
      });
      console.log(res.status);
      console.log(res);
    }

    console.log(props);
  }


  return (
    <Fragment>
      <h1 className="large text-primary text-center">Personal Loan</h1>
      <p className="lead text-center">Enter the OTP</p>
      
      <form className="form text-center"  onSubmit = {e=>onSubmit(e)}>
        <input
            type="text"
            placeholder="OTP"
            name="pin"
            style = {style}
            onChange ={e => onChange(e)}
            required
        />
        <br></br>
          <input type="submit"  className="btn btn-primary" style = {style} value="Submit OTP" />
      </form>
      
    </Fragment>
  )
}


export default Pin;
