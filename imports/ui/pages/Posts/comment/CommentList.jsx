import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

export default class CommentList extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    };

    handleDelete = index => {
        const {post} = this.props;

        Meteor.call('secured.post_delete_comment', post._id, post.comments[index]._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment deleted!');
        });
    };

    renderComments = () => {
        const {post} = this.props;
        return post.comments.map((comment, i) => (
            <div key={comment._id} className="comment-box" style={{marginBottom: 4}}>
                <fieldset>
                    <p>{comment.text}</p>
                    <small>Email: <strong>{post.user.emails[0].address}</strong></small>
                    <br/>
                    {(Meteor.userId() === post.user._id || Meteor.userId() === comment.userId) && <button onClick={() => this.handleDelete(i)}>Delete comment</button>}
                </fieldset>
            </div>
        ));
    };

    render() {
        const {comments} = this.props.post;
        console.log(this.props.post);
        if(!comments) return <p>No comments!</p>;
        return (
            <div>
                <h3>All comments ({comments.length})</h3>
                {this.renderComments()}
            </div>
        );
    }
}
