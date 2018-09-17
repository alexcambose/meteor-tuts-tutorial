import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Security from '/imports/api/security';
import { withApollo } from 'react-apollo';
import { Roles } from 'meteor/alanning:roles';
import {Button, ButtonGroup, Card, Meta, Row, Col} from "antd";

const getPosts =  gql`
{
	posts {
	_id
	title
	description
	user {
	    _id
	}
  }
}`;

const deletePost = gql`
    mutation deletePost($_id: String){
        deletePost(_id: $_id)
    }
`;

class PostList extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };
    state = {posts: null, intentionDelete: false};

    componentDidMount() {
        this.props.client.query({
            query: getPosts,
            fetchPolicy: 'no-cache',

        }).then(({ data }) => {
            this.setState({ posts: data.posts });
        });
    }

    deletePost = postId => {
        this.props.client
            .mutate({
                mutation: deletePost,
                variables: {
                    _id: postId
                }
            })
            .then(() => {
                this.componentDidMount();
            });
    };

    renderDeleteButton = post => {
        const { intentionDelete } = this.state;
        if(Meteor.userId() === post.user._id || Roles.userIsInRole(Meteor.userId(), 'admin')) {
            if(intentionDelete._id === post._id) {
                return <Button.Group>
                    <Button type="primary" onClick={() => this.deletePost(post._id)}>Yes</Button>
                    <Button type="danger" onClick={() => this.setState({ intentionDelete: false })}>No</Button>
                </Button.Group>;
            }
            return <Button block onClick={() => this.setState({ intentionDelete: { _id: post._id } })}>Delete</Button>;
        }
        return 'You are not admin';
    };

    render() {
        const {posts} = this.state;
        const {history} = this.props;

        if (!posts) {
            return <Card block loading={true}></Card>
        }

        return (
            <div className="posts">
                {
                    posts.map((post) => {
                        return (
                            <Card
                                style={{ margin: ' 5px 0' }}
                                key={post._id}
                                title={post.title}
                                extra={<Link to={`/posts/view/${post._id}`}>View post</Link>}
                            >
                                <p>Post id: {post._id} </p>
                                <Row type="flex" justify="space-between">
                                    <Col span={4}>
                                        <Button block onClick={() => {
                                            history.push("/posts/edit/" + post._id)
                                        }}> Edit post
                                        </Button>
                                    </Col>
                                    <Col span={4} style={{ textAlign: 'center' }}>
                                        { this.renderDeleteButton(post) }
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })}
                <Button type="primary" block onClick={() => history.push('/posts/create')}>Create a new post</Button>
            </div>
        )
    }
}

export default withApollo(PostList);
