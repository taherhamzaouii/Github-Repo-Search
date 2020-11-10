import React, {useState, useEffect} from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Body from './Body'
import Footer from './Footer'

import './Main.css'
function Main() {


    return (
        <div>
            <Header />
        <div className='main_body'>
          <SideBar />        
          <Body />  
        </div>    
        <Footer />
        </div>
    )
}

export default Main
