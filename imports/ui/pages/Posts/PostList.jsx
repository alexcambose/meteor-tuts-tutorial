import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

export default class PostList extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <Fragment key={post._id}>
                                <div>
                                    <p>Post id: {post._id} </p>
                                    <p>Post title: <Link to={`/posts/view/${post._id}`}>{post.title}</Link>, Post Description: {post.description} </p>
                                    <button onClick={() => {
                                        history.push("/posts/edit/" + post._id)
                                    }}> Edit post
                                    </button>
                                </div>
                                <hr/>
                            </Fragment>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
