import React from 'react';
import moment from 'moment';
import CommentView from "./comment/CommentView";

export default class PostView extends React.Component {
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
                <hr/>
                Created <strong>{moment(post.createdAt).fromNow()}</strong> |
                Viewed <strong>{post.views}</strong> times |
                <button disabled={Meteor.userId() !== post.user._id} onClick={this.handleDelete}>DELETE</button>
                <hr/>
                <CommentView post={post}/>
            </div>
        )
    }
}
