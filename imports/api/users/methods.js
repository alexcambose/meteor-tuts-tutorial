import {Meteor} from 'meteor/meteor';
import {Users} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'user.register' (data) {
        const user = Users.findOne({ 'emails.0.address': data.email });

        if (user) {
            throw new Meteor.Error(500, 'email_already_taken', 'Email already taken');
        }

        Accounts.createUser({
            email: data.email,
            password: data.password
        });
    },

    'user.delete' (userId) {
        Security.checkRole(userId, 'admin');
        Users.remove(userId);
    }
});
