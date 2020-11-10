import React, {useState, useEffect} from 'react'
import './Body.css'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import RepoItem from './RepoItem'
import moment from 'moment'
function Body() {

    //Search term state
    const [search, setSearch] = useState([]);
    //repos state to store the repositories fetched
    const [repos, setRepos] = useState([]);
    
    //getting the token stored in localStorage
    const token = localStorage.getItem('token')


    //fetching github repositories using Github's GraphQL v4 API
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

        //number of repositories
        const repoCount = repos && repos.data && repos.data.viewer && repos.data.viewer.repositories && repos.data.viewer.repositories.edges && repos.data.viewer.repositories.edges.length

        //filtering the repositories with the search term
        const filteredRepos = path && path.filter (rep => {
            return   rep.node && rep.node.name.toLowerCase().includes(search.toString().toLowerCase())
        })

        //function to convert the date from the api to a more clear date
        function dateConvert(dateString) {
            let tab = dateString.split('T')
            let dym = tab[0].split("-")
            let y= dym[0]
            let m= dym[1] - 1
            let d= dym[2]
            var da = new Date(y, m, d);
           return  moment(da).format('dddd D MMMM Y');
          }

      



        

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
                    //mapping repos to RepoItem
                filteredRepos && filteredRepos.map(el =>
                  <RepoItem title={el.node && el.node.name} desc={el.node && el.node.description} update={dateConvert(el.node && el.node.updatedAt)} priv={el.node && el.node.isPrivate} lang={el.node && el.node.primaryLanguage && el.node.primaryLanguage.name} />
                )
                }
                
        </div>
        
    )
}

export default Body
