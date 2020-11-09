import React, {useState, useEffect} from 'react'
import './SideBar.css'
import Button from '@material-ui/core/Button';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';

function SideBar() {

    const sidebar_query = {
        query: `
          query { 
            {
                viewer {
                  login
                  avatarUrl
                  name
                  followers (last: 100) {
                    edges{
                      node {
                        id
                      }
                    }
                  }
                  following (last: 100) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                  starredRepositories (last: 100) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }              
          }
          `,
      };
      


    return (
        <div className='sidebar'>
            <div className='sidebar_image'>
                <img src='https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg'></img>
            </div>
            <div className='sidebar_info'>
                <h2 className='name'>Taher Hamzaoui</h2>
                <h3 className='username'>taherhamzaouii</h3>
                <Button className='edit' variant="contained">Edit Profile</Button>
                <div className='lower_info'>
                    <div className='followers'>
                    <GroupOutlinedIcon  fontSize='tiny'/>
                    <span className='info'>1 Followers</span>
                    </div>
                    <span className='info'>0 Following </span>
                    <div className='star'>
                    <StarBorderRoundedIcon  fontSize='tiny'/>
                    <span className='info'>1</span>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default SideBar
