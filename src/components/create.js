import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from 'axios';
import useHistory from 'react-router-dom';

const Create = () => {
    let history = useHistory();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    const postData = () => {
        axios.post(`http://localhost:9000/users/`, {
            name,
            username,
            email,
            phonenumber,
            password
        }).then((response)=> {
            console.log(response.data);
            history.push('/read');
            resetForm();
        }).catch((err) => {
            console.log(err);
        });
    }
    const resetForm = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    }
    return(
        <Form className="create-form">
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' type="text" required onChange={(e)=> setName(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Username</label>
                <input placeholder='Username' type="text" required onChange={(e)=> setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' type="email" required onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Phone number</label>
                <input placeholder='Phone number' type="tel" required onChange={(e)=> setPhoneNumber(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" required onChange={(e)=> setPassword(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' onChange={(e)=> setCheckbox(!checkbox)} />
            </Form.Field>
            <Button onClick={postData} type='submit'>Submit</Button>
        </Form>
    )
}

export default Create;