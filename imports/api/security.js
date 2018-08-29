import { Roles } from 'meteor/alanning:roles';
import { Posts, Comments } from '/db';

export default class Security {
    static checkRole(userId, role) {
        if (!this.hasRole(userId, role)) {
            throw new Meteor.Error('not-authorized');
        }
    }
    static hasRole(userId, role) {
        return Roles.userIsInRole(userId, role);
    }
    static checkLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }
    static checkPostExists(postId) {
        const post = Posts.findOne(postId);
        if(!post) {
            throw new Meteor.Error('invalid-id', 'The post id provided is not valid');
        }
    }
    static checkCommentExists(commentId) {
        const post = Comments.findOne(commentId);
        if(!post) {
            throw new Meteor.Error('invalid-id', 'The comment id provided is not valid');
        }
    }
    static isUserAllowedToDeleteComment(postId, commentId, userId) {
        this.checkPostExists(postId);
        this.checkCommentExists(commentId);
        const post = Posts.findOne(postId);
        const comment = Comments.findOne(commentId);
        this.checkLoggedIn(userId);
        if(!(userId === post.userId && userId === comment.userId)) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }
    // add other business logic checks here that you use throughout the app
    // something like: isUserAllowedToSeeDocument()
    // always keep decoupling your code if this class gets huge.
}