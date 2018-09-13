import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
// import { Button } from "@blueprintjs/core";

const createComment =  gql`
    mutation deleteComment($_id: String){
        deleteComment(_id: $_id)
    }
`;

 class CommentList extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        changingIndex: PropTypes.number
    };
    state = {
        post: this.props.post,
        changingIndex: this.props.changingIndex
    };
    // getDerivedStateFromProps(state, props) {
    //     // if(state.changingIndex !== props.changingIndex) {
    //     //     this.setState(state => ({
    //     //         // post: state
    //     //     }));
    //     //     this.post.slice(changingIndex);
    //     // }
    // }
    handleDelete = _id => {
        const { post, client } = this.state;
        client.mutate({
                mutation: createComment,
                variables: {
                    _id
                },
            })
            .then(({ data }) => {
                location.reload();

                alert('Comment added!');
            });
        // Meteor.call('secured.post_delete_comment', post._id, post.comments[index]._id, (err) => {
        //     if (err) {
        //         return alert(err.reason);
        //     }
        //     alert('Comment deleted!');
        // });
    };

    renderComments = () => {
        const {post} = this.state;

        return post.comments.map((comment, i) => {
            const displayDeletebutton = Meteor.userId() === post.user._id
            || Meteor.userId() === comment.userId
            || Roles.userIsInRole(Meteor.userId(), 'admin');

            return <div key={comment._id} className="comment-box" style={{marginBottom: 4}}>
                <fieldset style={{backgroundColor: i%2 === 0 ? '#d8d8d8' : '#feffa6'}}>
                    <p>{comment.text}</p>
                    <small>Email: <strong>{post.user.emails[0].address}</strong></small>
                    <br/>
                    {displayDeletebutton && <button onClick={() => this.handleDelete(comment._id)}>Delete comment</button>}
                </fieldset>
            </div>
        });
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

export default withApollo(CommentList);