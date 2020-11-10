import React, {useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import './Login.css'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Footer from './Footer'
import Swal from 'sweetalert2'

function Login() {

    //state to store the token
    const [token, setToken] = useState('');
    //state to store the status of the request 
    const [status, setStatus] = useState('');
   
    //function to check the status of the request
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

    //function that will redirect the user to the main page if the token is valid
    const submitToken = (e) => {
        if(status){
            e.preventDefault();
            localStorage.setItem('token', token);
            window.location.reload()
        } else {
            Swal.fire({
                title: 'Something Went Wrong!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'OK'
              })
              
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
