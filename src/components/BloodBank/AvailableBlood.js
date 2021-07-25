import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getAvailableBlood } from '../api/Api';
import { Navbar, Table, Container } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



export default function AvailableBlood() {


    let [details,setDetails] = useState({
        data:[]
    })
    let [state, setState] = useState('*');
    let [type, setType] = useState('*');
    let admin = localStorage.getItem("admin")==='true';
    let  [LoggedIn, setLoggedIn] = useState(true)
    const [update, setUpdate] = useState({
        status:false,
        id:'',
        amount:'',
        type:'',
    })
    let URL ="http://localhost:8080/getDonars";
    useEffect(()=>{
        axios.post(URL,{
            state: state,
            type: type
        })
        .then((res) =>{ 
            var x=[];
            for(let i = 0 ;i<res.data.donars.length;i++)
                x[i]=res.data.donars[i];

            setDetails({
                data:x
            })
        })
        .catch(err=>{
            console.log(err)
        });
        
    },[state,type]);

    const handleState = (event) => {
        const selectedState=event.target.value
        setState( selectedState );
      };

      const handleType = (event) => {
        const selectedType=event.target.value
        setType( selectedType );
      };

    const logout= ()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("admin");
        setLoggedIn(false);
    }

    const UPDATE_URL = 'http://localhost:8080/updateBlood';
    const handleUpdate =()=>{
        
            axios.post(UPDATE_URL,{
                id:update.id,
                type:update.type,
                amount:update.amount
            })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            let x = !update.status;
            setUpdate({
                status:x
            })
            console.log(update)
    }

    const DELETE_URL = 'http://localhost:8080/deleteDonar';
    const deleteDonar = (id, key)=>{
        axios.post(DELETE_URL,{id:id})
        .then(res=>{
            let x = details.data;
            x.splice(key,1);
            setDetails({data:x})
        })
        .catch()
    }

    
    if(!LoggedIn){
        return (<Redirect to="/" />)
    }
    
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
                <h2 style={{color:'darkred'}}><b>Stock Availability</b></h2>
            </div>
            <div style={{marginTop:'10px'}}>
                
                <Select native onChange={handleState} name="state">
                    <option value='*'>All States</option>
                    <option value='telangana'>Telangana</option>
                    <option value='andra pradesh'>Andra Pradesh</option>
                    <option value='tamilnadu'>Tamil Nadu</option>
                    <option value='kerla'>Kerla</option>

                </Select>
               
                <Select native onChange={handleType} name="type" style={{marginLeft:'10px'}}>
                    <option value='*'>All Blood Groups</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>

                </Select>
            </div>
            <div style={{ marginTop:"40px"}}>
            <Table striped bordered hover variant="dark" style ={{margin: 'auto', width:'90%'}}>
                <thead>
                    <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Gender</th>
                    <th hidden={!admin}>Delete</th>
                    </tr>
                </thead>
                {
                    details.data.map((d,key)=>{ 
                        return(
                            <tbody key ={key}>
                                <tr>
                                <td>{key+1}</td>
                                <td>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.contact}</td>
                                {/*<td hidden={!admin} >{update.status  && update.id ===d.id && update.type==d.type ? <input value = {d.amount} onChange={(event)=>{
                                    let g = details.data;
                                    g[key].amount= event.target.value;
                                    let x = update.status;
                                    setUpdate({
                                        status:x,
                                        id:d.id,
                                        amount:event.target.value,
                                        type:d.type
                                    })
                                    setDetails({
                                        data:g
                                    })
                                }} /> : d.amount}</td>*/}
                                <td>{d.type}</td>
                                <td>{d.gender}</td>
                                <td hidden={!admin}><Button color="secondary" onClick={()=>{
                                    deleteDonar(d.id, key);
                                }}>Delete</Button></td>
                                {/*<td>
                                    {update.status && update.id ==d.id && update.type==d.type? 
                                        <Button onClick={handleUpdate}   color="primary">Update</Button> 
                                        : 
                                        <Button onClick={()=>{
                                            let x = !update.status;
                                            setUpdate({
                                                status:x,
                                                id:d.id,
                                                type:d.type
                                            });
                                         }}  color="secondary">Edit</Button>}
                                        </td>*/}
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

