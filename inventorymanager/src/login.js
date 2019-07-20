
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// const MuiThemeProvider=require('material-ui/styles/ ')
import AppBar from 'material-ui/AppBar';
// const AppBar=require('material-ui/AppBar')
import RaisedButton from 'material-ui/RaisedButton';
// const RaisedButton=require('material-ui/RaisedButton')
import TextField from 'material-ui/TextField';
// const TextField=require('material-ui/TextField')
import {Redirect} from 'react-router-dom';
import {Router} from 'react-router-dom';
import {Route} from 'react-router-dom/Route'
//import {Route} from react-router;
import InventoryPanel from './inventoryPanel';
//import { domainToASCII } from 'url';
var React = require('react');
const axios=require('axios')
var Component = React.Component;


//var handleClick=require('../handleclick')

class Login extends Component {
  state = {
    redirect: false
  }
  
  
  
  
  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    var apiBaseUrl = "http://localhost:3000/login";
    //var self = this;
    var payload={
      
    "email":this.state.username,
    "password":this.state.password
      
    }

    axios.post(apiBaseUrl, payload)
      .then(response => {
      console.log(response);
       if(response.status == 200){
          alert("Welcome User")
          console.log("Login successfull");
          this.setState({redirect:true})
          
          
       }
          
           
          // <Redirect from='/login' to='/users/inventory'/>
          // <Route path='/users/inventory' component={InventoryPanel}></Route>
         
        // var uploadScreen=[];
        // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        // 
         else if(response.status == 204){
          console.log("Username password do not match");
        alert("username password do not match")
        }else{
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const {redirect} = this.state
    return ( 
      <div className="Login">
       <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
         {redirect && <Redirect to="/app"/>}
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
