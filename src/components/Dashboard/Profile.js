import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Profile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GET_DATA_URL = 'http://localhost:8080/getUser';
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios.post(GET_DATA_URL,{userId:userId})
        .then(res =>{
            console.log(res);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setEmail(res.data.user.email);
            setPassword(res.data.user.password)
        })
        .catch(err => console.log(err))
    }, [])

    const UPDATE_URL = 'http://localhost:8080/updateUser';
    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.post(UPDATE_URL,{
           userId,
           firstName,
            lastName,
            password
        })
        .then(res =>{
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    const validate =()=>{
        return this.state.email.length>0 && this.state.password.length > 0 && this.state.firstName.length>0 && this.state.lastName.length>0 ;
    }

    return (
        <div>
            <h1>PROFILE</h1>
            <div style = {{  margin:'auto', width:'60%', height:'80%'}} >
            <Form style = {{padding:'20px',  margin:'auto'}} onSubmit={handleUpdate} >

            <Form.Group className="mb-3" controlId="firstName">
                    <b><Form.Label style={{display:'flex'}}>First Name</Form.Label></b>
                    <Form.Control type="text" 
                        name="firstName" 
                        autoFocus 
                        value={firstName}
                        onChange = {(event)=> setFirstName(event.target.value)}
                        onSubmit = {(event)=> {event.preventDefault();}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <b><Form.Label style={{display:'flex'}}>Last Name</Form.Label></b>
                    <Form.Control type="text" 
                        name="lastName" 
                        value={lastName}
                        onChange = {(event)=> setLastName(event.target.value)}
                        onSubmit = {(event)=> {event.preventDefault();}}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <b><Form.Label style={{display:'flex'}}>Email address</Form.Label></b>
                    <Form.Control type="email" 
                        name="email" 
                        value={email}
                        disabled={true}
                        onChange = {(event)=> setEmail(event.target.value)}
                        onSubmit = {(event)=> {event.preventDefault();}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <b><Form.Label style={{display:'flex'}}>Password</Form.Label></b>
                    <Form.Control type="password" 
                        name="password" 
                        value={password}
                        onChange = {(event)=> setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!validate}>
                    Update
                </Button>
            </Form>
            </div>
        </div>
    )
}
