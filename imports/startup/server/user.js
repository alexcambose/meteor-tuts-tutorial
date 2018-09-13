import { Roles } from 'meteor/alanning:roles';
import Users from '/db/users/collection';
import { Accounts } from 'meteor/accounts-base';

const createUser = (email, password, role) => {
    const userId = Accounts.createUser({
        email,
        password
    });
    Roles.addUsersToRoles(userId, role);
};

Meteor.startup(() => {
    const adminUsers = Users.find({ roles: ['admin']}).count();

    if(adminUsers === 0) createUser('ad@a.a' ,'asd', 'admin');
});
