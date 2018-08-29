import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const CommentView = ({ postId }) => (
    <Fragment>
        <CommentCreate postId={postId}/>
        <CommentList postId={postId}/>
    </Fragment>
);

CommentView.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentView;
