import { Button } from '@material-ui/core';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';


export default function ManageUser() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const isAdmin = localStorage.getItem("admin");

    const GET_USERS_URL = 'http://localhost:8080/getAllUsers';
    useEffect(() => {
        axios.get(GET_USERS_URL)
        .then(res=>{
            setData(res.data.users);
        })
        .catch(err => console.log(err))
    }, [data])

    const UPDATE_ADMIN_URL = 'http://localhost:8080/addOrRemoveAdmin';
    const handleAdmin =(id, admin)=>{
        console.log(!admin);
        axios.post(UPDATE_ADMIN_URL,{
            id:id,
            admin: !admin
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    const DELETE_USER_URL = 'http://localhost:8080/deleteUser';
    const handleDelete =(id)=>{
        axios.post(DELETE_USER_URL,{
            id:id
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    /*const SEARCH_USER_BY_NAME_URL = 'http://localhost:8080/getUserByName';
    const handleSearch = (event)=>{
            axios.post(SEARCH_USER_BY_NAME_URL,{
                name:search
            })
            .then(res=>{
                setData(res.data.users)
                console.log(res)
            })
            .catch(err => console.log(err))
        
    }*/
    if(isAdmin=='false')
    return (<Redirect to="/dashboard" />)
    return (
        <div>
            <h1>Users</h1>
            {/*<div>
                
                    <input type='text' placeholder="search by first name"  
                            style={{margin:'4px'}} 
                            onChange={(e)=>{
                                setSearch(e.target.value);
                            }} 
                    />
                    <Button color="primary" variant="contained" style={{margin:'4px'}} onClick={handleSearch}>Search</Button>
                
                        </div>*/}
            <div style={{ marginTop:"40px"}}>
            <Table striped bordered hover variant="dark" style ={{margin: 'auto', width:'90%', marginTop:"10px"}}>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Remove User</th>
                    </tr>
                </thead>
                {
                    data.map((d,key)=>{ 
                        return(
                            <tbody key ={key}>
                                <tr>
                                <td>{d.id}</td>
                                <td>{d.firstName}</td>
                                <td>{d.lastName}</td>
                                <td>{d.email}</td>
                                <td>{d.admin? 
                                    <Button color="secondary" onClick={()=>{
                                        
                                        handleAdmin(d.id, d.admin);
                                        let g = data;
                                        g[key].admin = !d.admin;
                                        data[key] = g;
                                        setData(data);
                                    }}>Remove Admin</Button> 
                                    : 
                                    <Button color="primary"  onClick={()=>{
                                        
                                        handleAdmin(d.id, d.admin);
                                        let g = data;
                                        g[key].admin = !d.admin;
                                        data[key] = g;
                                        setData(data);
                                    }}>Make Admin</Button>}
                                </td>
                                <td><Button color="secondary"  onClick={()=>{
                                        handleDelete(d.id);
                                    }}>Delete</Button></td>
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
