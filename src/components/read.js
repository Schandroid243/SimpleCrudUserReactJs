import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Read = ()=> {
    const [listUser, setListUser] = useState([]);
    useEffect(()=>{
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get(`http://localhost:9000/users/`).then((response) => {
            console.log(response.data);
            setListUser(response.data);
        })
    }
    const setData = (data) => {
        let {_id, name, username, email, phonenumber, password} = data;
        localStorage.setItem('ID',_id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Username', username);
        localStorage.setItem('Email', email);
        localStorage.setItem('PhoneNumber', phonenumber);
        localStorage.setItem('Password', password);
        console.log(data._id);
    }
    const onDelete = (id) => {
        axios.delete(`http://localhost:9000/users/${id}`).then((response) => {
            console.log(response.data);
            getUsers();
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>E-mail</Table.HeaderCell>
                        <Table.HeaderCell>PhoneNumber</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {listUser.map((data, i) => {
                        return(
                            <Table.Row>
                                <Table.Cell key={0}>{data.name}</Table.Cell>
                                <Table.Cell key={1}>{data.username}</Table.Cell>
                                <Table.Cell key={2}>{data.email}</Table.Cell>
                                <Table.Cell key={3}>{data.phonenumber}</Table.Cell>
                                <Link to='/update'>
                                <Table.Cell key={4}>
                                    <Button onClick={() => setData(data)}>Update</Button>
                                </Table.Cell>
                                </Link>
                                <Table.Cell key={5}>
                                    <Button onClick={() => onDelete(data._id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    );
}

export default Read;