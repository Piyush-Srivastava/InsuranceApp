import React, { Component, Fragment, useState } from 'react';


class OtpError extends Component{
// const OtpError = (props) => {

  componentDidMount(){
      setTimeout(() => {
        this.props.history.push('/loan')
      }, 3000);
  }

  render(){
    const style = {
      color: 'red'
    };

    const onClick =()=>{
      console.log(this.props);
    }

    return (
      <Fragment>
        <h1 className="large text-primary text-center">Personal Loan</h1>
        <h1 className="text-center" style={style}>{ this.props.location.state.message }</h1>    
        {/* <input type="submit" onClick= {() => onClick()} /> */}
      </Fragment>
    )
  }
}


export default OtpError;
