import React from 'react';
import moment from 'moment';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.view', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }


    render() {
        const {history} = this.props;
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <h1>{post.title}</h1>
                <p>{post.description}</p>
                <hr/>
                <p>Created {moment(post.createdAt).fromNow()}</p>
            </div>
        )
    }
}
