import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { Navbar, Nav, Container,Form, Card, ListGroup, ListGroupItem, Button as Btn, CardGroup, Dropdown  } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import bloodDrop from '../images/blood-drop.png'
import bloodDonation from '../images/blood-donation1.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn:false,
            admin:false
        }
        if(localStorage.getItem("userId")){
            this.state.loggedIn=true
        }
        this.state.admin=localStorage.getItem("admin");
        console.log(this.state.admin)
    }

    logout= ()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("admin");
        this.setState({loggedIn:false});
    }
    
   
    render() {
        if(!this.state.loggedIn)
        return (<Redirect to="/" />)
        const user = localStorage.getItem("userId");
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand >J-Blood bank</Navbar.Brand>
                    <div>
                        
                        <Dropdown style={{display:'initial', margin:'4px'}} hidden={ this.state.admin=='false'}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Manage
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/dashboard/EditBloodBank">Blood Bank</Dropdown.Item>
                                <Dropdown.Item href="/dashboard/availableBlood">Blood</Dropdown.Item>
                                <Dropdown.Item href="/dashboard/ManageUser">User</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <a href="/dashboard/Profile" style={{textDecoration:'none',margin:'4px'}}><Button style={{color:'white'}} variant="contained" color="primary"><AccountCircleIcon />Profile</Button></a>
                        <Button variant="contained" color="secondary" onClick={this.logout} style={{ margin:'4px'}}>
                            Logout
                        </Button> 
                    
                    </div>
                    </Container>
                </Navbar>
                <div>
                    <h2 style={{color:'red'}}><b>SERVICES</b></h2>
                    <p>J-Blood bank is an initiative to connect, digitize and streamline the work flow of blood banks across the nation</p>
                </div>
                <div>
                
                    <Paper style={{display:'inline-flex',width:'60%',marginTop:'20px'}}>
                    <div style={{margin:'auto',display:'inline-flex'}}>
                    <Card style = {{width:'18rem',margin:'5px'}}>
                        <Card.Img variant="top" src={bloodDrop} style = {{height:'300px'}} />
                        <Card.Body>
                            <Card.Title>Blood Availability</Card.Title>
                            <Card.Text>Get status of available blood stock in blood banks</Card.Text>
                        </Card.Body>
                        
                        <Btn variant="dark" onClick={event => window.location.href='/dashboard/availableBlood'}>Check Blood Availability</Btn>
                    </Card>
                    <Card style = {{width:'18rem',margin:'5px'}}>
                        <Card.Img variant="top" src={bloodDonation} style = {{height:'300px'}} />
                        <Card.Body>
                            <Card.Title>Donate Now</Card.Title>
                            <Card.Text>Get contact  details of blood banks</Card.Text>
                        </Card.Body>
                        
                        <Btn variant="dark"  onClick={event => window.location.href='/dashboard/BloodBanks'}>Donate Now</Btn>
                    </Card>
                    </div>
                    </Paper>
                    </div>
            </div>
        )
    }
}
