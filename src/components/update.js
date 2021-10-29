import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from 'axios';
import useHistory from 'react-router-dom';

const Update = () => {
    let history = useHistory();
    const [_id, setID] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() =>{
        setID(localStorage.getItem('ID'));
        setName(localStorage.getItem('Name'));
        setUsername(localStorage.getItem('Username'));
        setEmail(localStorage.getItem('Email'));
        setPhoneNumber(localStorage.getItem('PhoneNumber'));
        setPassword(localStorage.getItem('Password'));
    }, []);
    const updateData = () => {
        //console.log(_id);
        axios.put(`http://localhost:9000/users/${_id}`, {
            name,
            username,
            email,
            phonenumber,
            password
        }).then((response)=> {
            console.log(response.data);
            history.push('/read');
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <Form className="create-form">
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' type="text" required value={name} onChange={(e)=> setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' type="text" required value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Phone number</label>
                <input placeholder='Phone number' type="tel" required value={phonenumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' onChange={(e)=> setCheckbox(!checkbox)} />
            </Form.Field>
            <Button onClick={updateData} type='submit'>Update</Button>
        </Form>
    )
}

export default Update;