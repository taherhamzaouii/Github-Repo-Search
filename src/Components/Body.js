import './Body.css'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Divider from '@material-ui/core/Divider';
import React, {useState, useEffect} from 'react'

function Body() {

    const [data, setData] = useState([]);
    const token = '447f18174decd956a69e3dd36690556cad7fcce6'
    const fetchData = async() => {
        fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                query:'  {viewer {login avatarUrl  name starredRepositories(last: 100) {  edges { node { id}  } } repositories(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) { edges {  node {    name      isPrivate    description updatedAt    primaryLanguage {      name      }         }           }            }     }    }      '
            })
        })
        .then(response => response.json())
        .then(result => {
            setData(result)
        })
    }    
    useEffect(() => {
        fetchData();
        },[])
    console.log(data);

    return (
        <div className='body'>
            <div className='body_header_container'>
            <FolderOpenIcon  fontSize='medium'/>
            <h3 className='body_header_title'>Repositories</h3>
            </div>
                <input  placeholder='Find a repository...'></input>
                <Divider className='divider' variant="fullWidth" />
                
        </div>
        
    )
}

export default Body
