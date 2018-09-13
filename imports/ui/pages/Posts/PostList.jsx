import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Security from '/imports/api/security';
import { withApollo } from 'react-apollo';
import { Roles } from 'meteor/alanning:roles';

const getPosts =  gql`
{
	posts {
	_id
	title
	description
	user {
	    _id
	}
  }
}`;

const deletePost = gql`
    mutation deletePost($_id: String){
        deletePost(_id: $_id)
    }
`;

class PostList extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };
    state = {posts: null};


    componentDidMount() {
        this.props.client.query({
            query: getPosts,
            fetchPolicy: 'no-cache',

        }).then(({ data }) => {
            this.setState({ posts: data.posts });
        });
    }
    deletePost = postId => {
        this.props.client
            .mutate({
                mutation: deletePost,
                variables: {
                    _id: postId
                }
            })
            .then(() => {
                this.componentDidMount();
            });
    };

    renderDeleteButton = post => {
        if(Meteor.userId() === post.user._id || Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return <button onClick={() => this.deletePost(post._id)}>DELETE</button>;
        }
        return 'Bitch are not admin';
    };

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
                                    { this.renderDeleteButton(post) }
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

export default withApollo(PostList);
