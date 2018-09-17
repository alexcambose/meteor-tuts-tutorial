import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {AutoForm, LongTextField} from 'uniforms-antd';
import CommentSchema from '/db/comments/schema';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
import {Button} from "antd";

const createComment =  gql`
    mutation createComment($text: String, $postId: String){
        createComment(text: $text, postId: $postId)
    }
`;

class CommentCreate extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        onCreated: PropTypes.bool,
    };

    submit = ({ text }) => {
        const { client, post } = this.props;
        client
            .mutate({
                mutation: createComment,
                variables: {
                    text,
                    postId: post._id,
                },
            })
            .then(({ data }) => {
                location.reload();
                alert('Comment added!');
            });
    };

    render() {
        if(!Meteor.userId()) return <p style={{color: 'darkred'}}>Only authenticated users can post comments. :(</p>;
        return (
            <div className="comment-box">
                <AutoForm onSubmit={this.submit} schema={CommentSchema}>
                    <LongTextField name="text"/>
                    <Button htmlType="submit">Add comment</Button>
                </AutoForm>
            </div>
        )
    }
}

export default withApollo(CommentCreate);
