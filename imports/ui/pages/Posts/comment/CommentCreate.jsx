import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {AutoForm, LongTextField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';

export default class CommentCreate extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    };

    submit = (comment) => {
        Meteor.call('secured.post_create_comment', this.props.post._id, comment , (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment added!');
        });
    };

    render() {
        if(!Meteor.user()) return <p style={{color: 'darkred'}}>Only authenticated users can post comments. :(</p>;
        return (
            <div className="comment-box">
                <AutoForm onSubmit={this.submit} schema={CommentSchema}>
                    <LongTextField name="text"/>

                    <button type='submit'>Add comment</button>
                </AutoForm>
            </div>
        )
    }
}
