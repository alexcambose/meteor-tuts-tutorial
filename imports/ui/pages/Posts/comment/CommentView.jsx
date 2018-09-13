import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const CommentView = ({ post }) =>
    <Fragment>
        <CommentCreate post={post}/>
        <CommentList post={post}/>
    </Fragment>;


CommentView.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentView;
