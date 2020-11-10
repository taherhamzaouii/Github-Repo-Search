import React from 'react'
import './RepoItem.css'
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

//RepoItem that will be called by the body component to map the repos in it
function RepoItem({title, count, desc, lang, update, priv}) {
    return (
        <div className='repoItem'>
        <div className='repoItem_header'>
            <h2 className='repoItem_header_title' >{title}</h2>
            { priv ? <Badge className='private' color='primary' badgeContent={"Private"}/> : null }

        </div>
        <p className='repoDesc'>{desc}</p>
        <div className='repoItem_footer'>
            <h5 className='repoItem_lang'>{lang}</h5>
            <h5 className='repoItem_update'>Updated: {update}</h5>
        </div>
        <Divider className='divider' variant="fullWidth" />
    </div>   
    )
}

export default RepoItem
