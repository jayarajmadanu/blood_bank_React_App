import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navbar, Table, Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function AvailableBank() {
    let [details,setDetails] = useState({
        data:[]
    })
    let [state, setState] = useState('*');
    let  [LoggedIn, setLoggedIn] = useState(true)
    const isAdmin = localStorage.getItem("admin");

    let URL = "http://localhost:8080/getBloodBanks";
    useEffect(()=>{
        axios.post(URL,{
            state:state
        })
        .then((res)=>{
            setDetails({data:res.data.results});
        })
        .catch((err)=>{
            console.log(err)
        });
    },[state]);

    const handleState = (event) => {
        const selectedState=event.target.value
        setState( selectedState );
    };

    const logout= ()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("admin");
        setLoggedIn(false);
    }



    if(!LoggedIn){
        return (<Redirect to="/" />)
    }
    if(isAdmin=='false')
    return (<Redirect to="/dashboard" />)
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand >J-Blood bank</Navbar.Brand>
                    
                    <div>
                    <Button variant="contained" color="secondary" onClick={logout}>
                        Logout
                    </Button> 
                    <a href="/dashboard/Profile" style={{textDecoration:'none'}}><Button style={{color:'white'}} ><AccountCircleIcon />Profile</Button></a>
                    </div>

                    </Container>
            </Navbar>
            <div >
                <h2 style={{color:'darkred'}}><b>Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)</b></h2>
            </div>
            <div style={{marginTop:'10px'}}>
                <Select native onChange={handleState} name="state">
                    <option value='*'>All States</option>
                    <option value='telangana'>Telangana</option>
                    <option value='andra pradesh'>Andra Pradesh</option>
                    <option value='tamilnadu'>Tamil Nadu</option>
                    <option value='kerla'>Kerla</option>

                </Select>
            </div>
            
            <div style={{ marginTop:"40px"}}>
            <Table striped bordered hover variant="dark" style ={{margin: 'auto', width:'90%', marginTop:"10px"}}>
                <thead>
                    <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>State</th>
                    <th>Update</th>
                    </tr>
                </thead>
                {
                    details.data.map((d,key)=>{ 
                        return(
                            <tbody key ={key}>
                                <tr>
                                <td>{key+1}</td>
                                <td>{d.name}</td>
                                <td>{d.address}</td>
                                <td>{d.contact}</td>
                                <td>{d.state}</td>
                                <td><a href={"/bankUpdate?id="+d.id } style={{textDecoration:'none'}}><Button color="primary">Update</Button></a></td>
                                </tr>
                            </tbody>
                            );
                        }
                        )
                }
            </Table>
            </div>
        </div>
    )
}
