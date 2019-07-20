import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const axios=require('axios');
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      age:'',
      email:'',
      password:'',
      adminCode:'',
      isadmin:'',
      itemDescription:[],
      quantity:'',
      feedback:''

    }
  }
  handleClick(event){
    var apiBaseUrl = "http://localhost:3000/register";
    console.log("values",this.state.name,this.state.age,this.state.email,this.state.password,this.state.adminCode,this.state.isadmin,this.state.itemDescription,this.state.quantity,this.state.feedback);
    //To be done:check for empty values before hitting submit
    //var self = this;
    var payload={
    name: this.state.name,
    age:this.state.age,
    email:this.state.email,
    password:this.state.password,
    adminCode:this.state.adminCode,
    itemDescription:this.state.itemDescription,
    quantity:this.state.quantity,
    feedback:this.state.feedback
    }
    
    axios.post(apiBaseUrl, payload)
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
       console.log("registration successfull");
    //    var loginscreen=[];
    //    loginscreen.push(<Login parentContext={this}/>);
    //    var loginmessage = "Not Registered yet.Go to registration";
    //    self.props.parentContext.setState({loginscreen:loginscreen,
    //    loginmessage:loginmessage,
    //    buttonLabel:"Register",
    //    isLogin:true
        }
     })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter Age"
             floatingLabelText="Age"
             onChange = {(event,newValue) => this.setState({age:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}

             />
           <br/>
           <TextField
             hintText="Enter Admin Code"
             floatingLabelText="Admin Code"
             onChange = {(event,newValue) => this.setState({adminCode:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter Item Description"
             floatingLabelText="Item"
             onChange = {(event,newValue) => this.setState({itemDescription:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter Quantity"
             floatingLabelText="Quantity"
             onChange = {(event,newValue) => this.setState({quantity:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter feedback"
             floatingLabelText="feedback"
             onChange = {(event,newValue) => this.setState({feedback:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;