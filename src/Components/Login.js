import React, {useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import './Login.css'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Footer from './Footer'

function Login() {

    const [token, setToken] = useState('');
    const [status, setStatus] = useState('');
   
    const check = async() => {
        fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
         .then((response) => {
            if(response.status === 200){
                setStatus(true)
    
            }else {
                setStatus(false)
            }
        })
    } 

    


    useEffect(() => {
        check();
        },[token])

    const submitToken = (e) => {
        if(status){
            e.preventDefault();
            localStorage.setItem('token', token);
            window.location.reload()
        } else {
            alert("Something Went Wrong")
        }
    };

    return (
        <div className='login'>
            <GitHubIcon style={{ fontSize: 200 }} />
            <h2>Github Repository Search</h2>
            <input className='token_input' type='password'  placeholder='Enter your Github Token' onChange={e => {
						setToken(e.target.value)	}} ></input>
            <Button className='token_button' variant="contained" onClick={submitToken}>Submit Token</Button>
            <Footer />
        </div>
    )
}

export default Login
