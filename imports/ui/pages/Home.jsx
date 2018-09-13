import React from 'react';
import {Users} from '/db';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";

const userDelete = gql`
    mutation deleteUser($_id: String){
        deleteUser(_id: $_id)
    }
`;

class Home extends React.Component {
    deleteUser = _id => {
        this.props.client
            .mutate({
                mutation: userDelete,
                variables: {
                    _id,
                },
            })
            .then(({ data }) => {
                console.log("user deleted");
            });
        // Meteor.call('user.delete', userId, (err) => {
        //     if(err) {
        //         console.log(err);
        //         return;
        //     }
        // });
    };

    deleteButton = userId => {
        if(Roles.userIsInRole(Meteor.userId(), 'admin') && userId !== Meteor.userId())
            return <button onClick={() => this.deleteUser(userId)}>Delete</button>;
    };

    render() {
        const { users } = this.props;
        return (
           <ul>
               {users.map((user) =>
                    <li key={user._id}>
                        {user._id} <strong>{user.emails[0].address}</strong>
                        { this.deleteButton(user._id) }
                    </li>
               )}
           </ul>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('users');
    return {
        users: Users.find().fetch(),
    }
})(withApollo(Home));