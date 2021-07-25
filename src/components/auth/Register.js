import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router';

import axios from 'axios'

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state ={
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            loggedIn:false,
            error:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.post("http://localhost:8080/register",{
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password
        }).then(response =>{
            localStorage.setItem("userId", response.data.id)
            localStorage.setItem("admin",response.data.admin);
            this.setState({loggedIn:true})
        }).catch(err =>{
            console.log(err)
        })
        
    }
    validate(){
        return this.state.email.length>0 && this.state.password.length > 0 && this.state.firstName.length>0 && this.state.lastName.length>0 ;
    }

    render() {
        if(this.state.loggedIn){
            return (<Redirect to="/dashboard" />)
        }
        return (
            <div>
                 <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand >J-Blood bank</Navbar.Brand>
                    <p>
                    <Nav className="me-auto" >
                        <Nav.Link href="/" >Login</Nav.Link>
                    </Nav>
                    </p>
                    </Container>
                </Navbar>
                
                    {this.state.error && <div>{this.state.error}</div>}
                
                <div style = {{paddingTop:'40px'}}>
                    <h3><b>Sign Up</b></h3>
                </div>

                <Paper elevation={3} style = {{height:'55%', width:'25%', display:'inline-flex' ,marginTop:'50px',backgroundColor:'#4d4d4d'}}>
                    <Form style = {{padding:'20px',  margin:'auto', color:'white'}} onSubmit = {this.handleSubmit} >

                    <Form.Group className="mb-3" controlId="firstName">
                            <b><Form.Label>First Name</Form.Label></b>
                            <Form.Control type="text" 
                                placeholder="Enter First Name"  
                                name="firstName" 
                                autoFocus 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <b><Form.Label>Last Name</Form.Label></b>
                            <Form.Control type="text" 
                                placeholder="Enter Last Name"  
                                name="lastName" 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <b><Form.Label>Email address</Form.Label></b>
                            <Form.Control type="email" 
                                placeholder="Enter email"  
                                name="email" 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <b><Form.Label>Password</Form.Label></b>
                            <Form.Control type="password" 
                                placeholder="Password" 
                                name="password" 
                                onChange = {(event)=>{
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                }
                             />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!this.validate()}>
                            Submit
                        </Button>
                        <div style = {{marginTop:'10px'}} >
                        Already have account? | <span><a href = '/'>login here</a></span>
                    </div>
                    </Form>
                    
                </Paper>

            </div>
        )
    }
}
