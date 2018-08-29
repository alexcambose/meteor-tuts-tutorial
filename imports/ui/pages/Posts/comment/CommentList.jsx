import React from 'react';
import PropTypes from 'prop-types';
import CommentBox from "./CommentBox";

export default class CommentCreate extends React.Component {
    static propTypes = {
        postId: PropTypes.string.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            comments: [],
        }
    }

    componentDidMount = () => {
        Meteor.call('post.comments', this.props.postId, (err, comments) => {
            this.setState({comments});
        });
    };

    render() {
        const {comments} = this.state;
        if(comments.length === 0) return <p>No comments!</p>;
        return (
            <div>
                <h3>All comments ({comments.length})</h3>
                {comments.map(e => <CommentBox key={e._id} postId={this.props.postId} comment={e}/>)}
            </div>
        );
    }
}
