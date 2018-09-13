import {Users} from '/db';
import {Meteor} from "meteor/meteor";
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('users', () => {

    return Users.find();
});