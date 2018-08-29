import React from 'react';
import PropTypes from "prop-types";

export default class CommentBox extends React.Component {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        comment: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            userEmail: null,
        }
    }

    componentDidMount() {
        Meteor.call('post.view', this.props.postId, (err, post) => {
            this.setState({post});

        });
        Meteor.call('user.getEmail', this.props.comment.userId, (err, userEmail) => {
            this.setState({userEmail});
        });
    }

    handleDelete = () => {
        Meteor.call('secured.post_delete_comment', this.props.postId, this.props.comment._id, (err, post) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment deleted!');
        });
    };

    render() {
        const {comment} = this.props;
        const {post, userEmail} = this.state;

        if(!post) return <span>Loading...</span>;
        const displayDelete = Meteor.userId() === post.userId || Meteor.userId() === comment.userId;

        return (
            <div className="comment-box" style={{marginBottom: 4}}>
               <fieldset>
                   <p>{comment.text}</p>
                   <small>Email: <strong>{userEmail}</strong></small>
                   <br/>
                   {displayDelete && <button onClick={this.handleDelete}>Delete comment</button>}
               </fieldset>
            </div>
        )
    }
}
