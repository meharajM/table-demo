import React from 'react';
import "./style.css"
function User({username, website}){
    return <div className="user">
        
        <div className="user-name"><div className="user-image"></div>{username}</div>
        <div className="website"><a href={website}>{website}</a></div>
    </div>
}
export default React.memo(User)