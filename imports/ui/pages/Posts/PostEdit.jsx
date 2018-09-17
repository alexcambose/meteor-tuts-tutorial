import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-antd';
import PostSchema from '/db/posts/schema';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
import {Button} from "antd";

const postEdit = gql`
    mutation editPost($_id: String, $title: String, $description: String, $type: String){
        editPost(_id: $_id, title: $title, description: $description, type: $type)
    }
`;

const getPosts =  gql`
query Posts($_id: String){
    posts(_id: $_id){
        _id
        title
        description
        type
    }
}`;

class PostEdit extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        post: null
    };

    componentDidMount() {
        this.props.client.query({
            query: getPosts
        }).then(({ data }) => {
            console.log(data.posts);
            this.setState({ post: data.posts[0] });
        });
    }

    submit = ({ _id, title, description, type}) => {
        this.props.client
            .mutate({
                mutation: postEdit,
                variables: {
                    _id,
                    title,
                    description,
                    type,
                },
            })
            .then(({ data }) => {
                this.props.history.goBack();
                alert('Post updated!');
            });
        // Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
        //     if (err) {
        //         return alert(err.reason);
        //     }
        //     alert('Post modified!')
        // });
    };

    render() {
        const {history} = this.props;
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type"/>
                    <Button.Group>
                        <Button htmlType="submit">Edit post</Button>
                        <Button onClick={() => history.push('/posts')}>Back to posts</Button>
                    </Button.Group>
                </AutoForm>
            </div>
        )
    }
}

export default withApollo(PostEdit);