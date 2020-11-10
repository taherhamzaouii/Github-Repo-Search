import React from 'react'
import './Header.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function Header() {
    //state for the Menu 
    const [anchorEl, setAnchorEl] = React.useState(null);

    //open menu
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    //close menu
    const handleClose = () => {
      setAnchorEl(null);
    };

    //function that logs the user out of his account and clears the local storage
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear()
        window.location.reload()
    };
  
    return (
        <div className='header'>
           <div className='header_left'>
           <a href='#'><GitHubIcon className='header_logo' fontSize='large'/></a>
                <input id='search' placeholder='Search or jump to...'></input>
                <div className='header_links' >
                    <a href='#'><h5>Pull Requests</h5></a>
                    <a href='#'><h5>Issues</h5></a>
                    <a href='#'><h5>Marketplace</h5></a>
                    <a href='#'><h5>Explore</h5></a>
                </div>

           </div>
           
           <div className='header_right'>
                <IconButton color='inherit' edge="start"   >
                    <NotificationsNoneOutlinedIcon  fontSize='medium'/>
                </IconButton>
                
                
                <IconButton color='inherit' edge="start"  >
                    <AddOutlinedIcon  fontSize='medium'/>
                </IconButton>
                 <IconButton color='inherit' edge="start" onClick={handleClick}  >
                    <AccountCircleOutlinedIcon fontSize='medium'/>
                </IconButton>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout} >Logout</MenuItem>
            </Menu>
                
           </div>  
        </div>
    )
}

export default Header
