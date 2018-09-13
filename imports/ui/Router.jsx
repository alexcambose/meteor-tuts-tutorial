import React, {Fragment} from 'react';
import {Route, withRouter} from 'react-router';
import {Redirect} from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import PostCreate from './pages/Posts/PostCreate';
import PostView from './pages/Posts/PostView';
import PostEdit from './pages/Posts/PostEdit';
import PostList from './pages/Posts/PostList';
import PostListReactive from './pages/Posts/PostListReactive';

import Register from './pages/Users/Register';
import Login from './pages/Users/Login';

const Routes = ({ location }) => {
    return <App>
        {/*{ (!Meteor.user() && location.pathname !== '/login') && <Redirect to='login'/>}*/}
            <Route exact path="/" component={Home}/>
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/posts/reactive" component={PostListReactive} />
            <Route exact path="/posts/create" component={PostCreate} />
            <Route exact path="/posts/view/:_id" component={PostView} />
            <Route exact path="/posts/edit/:_id" component={PostEdit} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
    </App>
}

export default withRouter(Routes);