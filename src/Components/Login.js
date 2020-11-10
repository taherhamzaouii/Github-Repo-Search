import React, {useState, useEffect} from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import './Login.css'
import Button from '@material-ui/core/Button';

function Login() {

    const [token, setToken] = useState('');

    const submitToken = (e) => {
        e.preventDefault();
        localStorage.setItem('token', token)
        console.log("button clicked")
        window.location.reload()
    };
    console.log(token)
    return (
        <div className='login'>
            <GitHubIcon style={{ fontSize: 200 }} />
            <input className='token_input' type='password'  placeholder='Enter your Github Token' onChange={e => {
						setToken(e.target.value)	}} ></input>
            <Button className='token_button' variant="contained" onClick={submitToken}>Submit Token</Button>
        </div>
    )
}

export default Login
