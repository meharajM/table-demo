import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Table from '../Table'
import {getData} from '../api'
import Post from '../Post'
function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getPostsData() {
      const posts = await getData('https://jsonplaceholder.typicode.com/posts');
      setLoading(false);
      setPosts(posts);
    }
    getPostsData();
  }, []);
  useEffect(() => {
    async function getUserData() {
      const users =  await getData('https://jsonplaceholder.typicode.com/users');
      setUsers(users);
    }
    getUserData();
  }, []);
  const getPostUser = useMemo(() => {
    return users.filter((u) => u.id === selectedPost.userId)
  },[users, selectedPost]);
  const backToHome = () => setSelectedPost({})
  return (
    <div className="App">
      {!selectedPost.id && <>{loading ? <div>Loading Users...</div> : <Table data={posts} rowProps={{onClickHandler: (rowData) => {
        setSelectedPost(rowData)
      }}} columns={[{label:'Id', accesor:'id'},{label:"User id", accesor: 'userId'} ,{label: 'Title',accesor:'title', className: 'title'}]}/>}
      </>}
      {selectedPost.id &&
        <Post selectedPost={selectedPost} user={getPostUser[0]} backToHome={backToHome}/>
      }   
           
        
    </div>
  );
}

export default App;
