import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReactTable from "react-table"
import "react-table/react-table.css"
const axios=require('axios')
class InventoryPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    componentDidMount(){
        const url="http://localhost:3000/users"
        // axios.get(url).then(response=> response.json()).then(posts=>{
        //     this.setState({posts:posts})
        // })
        axios.get(url).then(response=>{


        this.setState({ tableData: response.data})
        
        })
    }
    render(){
        const { tableData } = this.state;
        const components=[

            {
                Header:"Name",
                accessor:"name"
            },
            {
                Header:"Item Description",
                accessor:"itemDescription"
            },
            {
                Header:"Serial id",
                accessor:"serialid"
            },
            
            {
                Header:"Quantity",
                accessor:"quantity"
            },
            {
                Header:"Feedback",
                accessor:"feedback"
            },
        ]
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                        title="My Invetory"/>
                        <ReactTable
                        data={tableData}
                        columns={components}
                        ></ReactTable>
                    </div>
                </MuiThemeProvider>
            </div>
                

        )
            
        }
    }
    export default InventoryPanel

