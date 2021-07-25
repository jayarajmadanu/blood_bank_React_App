import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';


export default function UpdateBloodBank() {
    const queryParam = new URLSearchParams(window.location.search);
    const id = queryParam.get('id');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [state, setState] = useState('');
    const [updated,setUpdated] = useState('');
    const isAdmin = localStorage.getItem("admin");

    const GET_BLOOD_BANK_BY_ID_URL = 'http://localhost:8080/getBloodBank';
    useEffect(() => {
        axios.post(GET_BLOOD_BANK_BY_ID_URL,{id:id})
        .then(res =>{
            setName(res.data.bank.name);
            setAddress(res.data.bank.address);
            setContact(res.data.bank.contact);
            setState(res.data.bank.state);
            console.log(res)
        })
    }, [])

    const UPDATE_BLOOD_BANK_BY_ID_URL='http://localhost:8080/updateBloodBank';
    const handleUpdate = (event)=>{
        event.preventDefault();
        axios.post(UPDATE_BLOOD_BANK_BY_ID_URL,{
            name:name,
            address:address,
            contact:contact,
            state:state,
            id:id
        })
        .then(res=>{
            setUpdated(res.data);
            console.log(res)
        })
        .catch(err=> console.log(err));
    }
    if(isAdmin=='false')
    return (<Redirect to="/dashboard" />)
    return (
        <div>
            <h1>Update here</h1>
            <div style={{backgroundColor: 'lightblue'}}>{updated}</div>
            <div style={{width:'60%', margin:'auto'}}>
            <Form  onSubmit={handleUpdate}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" 
                        value={name} 
                        onChange= {(e)=>setName(e.target.value)} 
                        onSubmit = {(event)=> {event.preventDefault();}}
                        name="name"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" 
                        value={address} 
                        onChange= {(e)=>setAddress(e.target.value)} 
                        onSubmit = {(event)=> {event.preventDefault();}}
                        name="address"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" 
                        value={contact} 
                        onChange= {(e)=>setContact(e.target.value)} 
                        onSubmit = {(event)=> {event.preventDefault();}}
                        name="contact" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" 
                        value={state} 
                        onChange= {(e)=>setState(e.target.value)}
                        onSubmit = {(event)=> {event.preventDefault();}}
                        name="state"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            </div>
        </div>
    )
}
