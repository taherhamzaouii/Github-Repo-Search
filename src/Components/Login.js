import React, {useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import './Login.css'
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

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
                console.log("SUCCESSS")
                setStatus(true)
    
            }else {
                console.log("SOMETHING WENT WRONG")
                setStatus(false)
            }
        })
    } 

    

    console.log("statussss",status)

    useEffect(() => {
        check();
        },[token])

    const submitToken = (e) => {
        if(status){
            e.preventDefault();
            localStorage.setItem('token', token);
            console.log("success");
            window.location.reload()
        } else {
            alert("Something Went Wrong")

            console.log("error")
        }
    };

    console.log(token)
    return (
        <div className='login'>
            <GitHubIcon style={{ fontSize: 200 }} />
            <h2>Github Repository Search</h2>
            <input className='token_input' type='password'  placeholder='Enter your Github Token' onChange={e => {
						setToken(e.target.value)	}} ></input>
            <Button className='token_button' variant="contained" onClick={submitToken}>Submit Token</Button>
        </div>
    )
}

export default Login
