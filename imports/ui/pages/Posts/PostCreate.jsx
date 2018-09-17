import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-antd';
import PostSchema from '/db/posts/schema';
import {PostTypesLabels} from "../../../api/posts/enums/types";
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {Button} from "antd";

const createPosts =  gql`
    mutation createPost($title: String, $description: String, $type: String){
        createPost(title: $title, description: $description, type: $type)
    }
`;


class PostCreate extends React.Component {
    submit = ({ title, description, type }) => {
        this.props.client
            .mutate({
                mutation: createPosts,
                variables: {
                    title,
                    description,
                    type
                },
            })
            .then(({ data }) => {
                this.props.history.push('/posts');
                alert('Post added!');
            });

    };

    render() {
        const {history} = this.props;
        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={Object.keys(PostTypesLabels).map(e => ({label: PostTypesLabels[e], value: e}))}/>
                    <Button.Group>
                        <Button htmlType="submit">Add post</Button>
                        <Button onClick={() => history.push('/posts')}>Back to posts</Button>
                    </Button.Group>
                </AutoForm>
            </div>
        )
    }
}


export default withApollo(PostCreate);