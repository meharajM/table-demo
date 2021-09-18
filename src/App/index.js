import { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './App.css';
import Table from '../Table'
import {getData} from '../api'
import {useRouteMatch, Switch, Route, useHistory, Router} from "react-router-dom";
import Post from '../Post'
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let { path, url } = useRouteMatch();
  let history = useHistory();
  useEffect(() => {
    async function getUsersData() {
      const posts = await getData('https://jsonplaceholder.typicode.com/posts');
      setLoading(false);
      setPosts(posts)
    }
    getUsersData();
  }, [])
  return (
    <div className="App">
      {loading ? <div>Loading Users...</div> : <Table data={posts} rowProps={{onClickHandler: (rowData) => {
        history.push(`${path}/${rowData.id}`)
      }}} columns={[{label:'Id', accesor:'id'},{label:"User id", accesor: 'userId'} ,{label: 'Title',accesor:'title'}]}/>}
          <Switch>
            <Route path={`${path}/:id`}>
              <Post posts={posts}/>
            </Route>
          </Switch>
        
    </div>
  );
}

export default App;
