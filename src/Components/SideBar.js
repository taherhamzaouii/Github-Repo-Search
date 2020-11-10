import React, {useState, useEffect} from 'react'
import './SideBar.css'
import Button from '@material-ui/core/Button';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

function SideBar() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem('token')
    const fetchData = async() => {
        fetch("https://api.github.com/graphql", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                query:' {  viewer {  location  login    avatarUrl    name    followers (last: 100) {      edges{        node {          id        }      }    }    following (last: 100) {      edges {        node {          id        }      }    }    starredRepositories (last: 100) {      edges {        node {          id        }      }    }  }} '
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
    console.log('dataaaa',data);
    console.log('namee',data && data.data && data.data.viewer && data.data.viewer.followers && data.data.viewer.followers.edges.length )

    return (
        <div className='sidebar'>
            <div className='sidebar_image'>
                <img src={data && data.data && data.data.viewer && data.data.viewer.avatarUrl}></img>
            </div>               
            <div className='sidebar_info'>
            <h2 className='name'>{data && data.data && data.data.viewer && data.data.viewer.name}</h2>
            <h3 className='username'>{data && data.data && data.data.viewer && data.data.viewer.login}</h3>
            <Button className='edit' variant="contained">Edit Profile</Button>
            <div className='lower_info'>
                <div className='followers'>
                <GroupOutlinedIcon  fontSize='tiny'/>
                <span className='info'>{data && data.data && data.data.viewer && data.data.viewer.followers && data.data.viewer.followers.edges && data.data.viewer.followers.edges.length} Followers</span>
                </div>
                <span className='info'>{data && data.data && data.data.viewer && data.data.viewer.following && data.data.viewer.following.edges && data.data.viewer.following.edges.length} Followers</span>
                <div className='star'>
                <StarBorderRoundedIcon  fontSize='tiny'/>
                <span className='info'>{data && data.data && data.data.viewer && data.data.viewer.starred && data.data.viewer.starred.edges && data.data.viewer.starred.edges.length} Followers</span>
                </div>
            </div>
            <div className='location'>
            <LocationOnOutlinedIcon  fontSize='tiny'/>
            <span className='info'>{data && data.data && data.data.viewer && data.data.viewer.location}</span>
            </div>
            </div>  
             
        </div>
    )
}

export default SideBar
