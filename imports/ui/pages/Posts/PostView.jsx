import React from 'react';
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import CommentView from "./comment/CommentView";
import {PostTypesLabels} from "../../../api/posts/enums/types";

export default class PostView extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.view', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }
    handleDelete = () => {
        const {history} = this.props;
        Meteor.call('secured.post_remove', this.state.post._id, (err, post) => {
            if(err) {
                return alert(err.reason);
            }
            alert("Post deleted! You will be redirected!");
            history.push("/posts");
        });
    };

    render() {
        const {post} = this.state;
        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <h3>Type: <em>{PostTypesLabels[post.type]}</em></h3>
                <hr/>
                Created <strong>{moment(post.createdAt).fromNow()}</strong> by {post.user ? post.user.emails[0].address : 'Anonymous'} |
                Viewed <strong>{post.views}</strong> times |
                <button disabled={post.user && Meteor.userId() !== post.user._id} onClick={this.handleDelete}>DELETE</button>
                <hr/>
                <CommentView post={post}/>
            </div>
        )
    }
}
