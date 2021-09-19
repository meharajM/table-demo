
import React from 'react';
import User from '../User';
import './style.css';
function Post({selectedPost, user, backToHome}) {
   return <div className="container">
       <div className="back" onClick={backToHome}><a>Home</a></div>
       <User {...user}/>
       <div className="post">
        <h1 className="title">{selectedPost.title}</h1>
        <p className="body">{selectedPost.body}</p>
       </div>
       
   </div>
}
export default React.memo(Post)