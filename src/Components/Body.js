import React, {useState, useEffect} from 'react'
import './Body.css'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import RepoItem from './RepoItem'

function Body() {

    const [search, setSearch] = useState([]);
    const [repos, setRepos] = useState([]);
    
    const token = '447f18174decd956a69e3dd36690556cad7fcce6'
    const fetchrepos = async() => {
        fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                query:'{  viewer {    repositories(last:100 orderBy: {field: CREATED_AT, direction: DESC}) {      edges {        node {   isPrivate       name          description          updatedAt          primaryLanguage {            name          }        }      }    }  }}'
            })
        })
        .then(response => response.json())
        .then(result => {
            setRepos(result)
        })
    }    
    useEffect(() => {
        
        fetchrepos();
        },[])
        const path = repos && repos.data && repos.data.viewer && repos.data.viewer.repositories && repos.data.viewer.repositories.edges && repos.data.viewer.repositories.edges
        const repoCount = repos && repos.data && repos.data.viewer && repos.data.viewer.repositories && repos.data.viewer.repositories.edges && repos.data.viewer.repositories.edges.length
    console.log(repos);
    // console.log('namee',repoCount )

        const filteredRepos = path && path.filter (rep => {
            return   rep.node && rep.node.name.toLowerCase().includes(search.toString().toLowerCase())
        })

    return (
        
        <div className='body'>
           
            <div className='body_header_container'>
            <FolderOpenIcon  fontSize='medium'/>
            <h3 className='body_header_title'>Repositories</h3>
            <Badge color='primary' badgeContent={repoCount}/>
            </div>
                <input  placeholder='Find a repository...' onChange={e => setSearch(e.target.value)}></input>
                <Divider className='divider' variant="fullWidth" />

                {
                filteredRepos && filteredRepos.map(el =>
                  <RepoItem title={el.node && el.node.name} desc={el.node && el.node.description} update={el.node && el.node.updatedAt} priv={el.node && el.node.isPrivate} lang={el.node && el.node.primaryLanguage && el.node.primaryLanguage.name} />
                )
                }
                
        </div>
        
    )
}

export default Body
