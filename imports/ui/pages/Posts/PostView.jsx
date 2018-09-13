import React from 'react';
import PropTypes from "prop-types";
// import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import CommentView from "./comment/CommentView";
import {PostTypesLabels} from "../../../api/posts/enums/types";
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";

const incrementPostViews = gql`
    mutation incrementView($_id: String){
        incrementView(_id: $_id)
    }
`;

const getPosts =  gql`
query Posts($_id: String){
    posts(_id: $_id){
        _id
        title
        description
        views
        type
        user {
            _id
            emails {
                address        
            }
        }
        comments {
            _id
            text
        }
    }
}`;

class PostView extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        posts: {},
    };

    componentDidMount() {
        this.props.client.query({
            query: getPosts
        }).then(({ data }) => {
            const post = data.posts[0];
            this.markViewed(post._id);
            this.setState({ post });
        });
    }

    markViewed(_id) {
        this.props.client.mutate({
            mutation: incrementPostViews,
            variables: {
                _id
            }
        }).then(() => {
            console.log('incremented')
        });
    }

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }
        console.log(post)
        return (
            <div className="post">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <h3>Type: <em>{PostTypesLabels[post.type]}</em></h3>
                <hr/>
                Created <strong>{moment(post.createdAt).fromNow()}</strong> by {post.user ? post.user.emails[0].address : 'Anonymous'} |
                Viewed <strong>{post.views}</strong> times |
                 {/*<button disabled={post.user && Meteor.userId() !== post.user._id} onClick={this.handleDelete}>DELETE</button> */}
                <hr/>
                <CommentView post={post}/>
            </div>
        )
    }
}

export default withApollo(PostView);