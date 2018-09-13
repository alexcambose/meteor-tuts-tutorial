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
            throw new Meteor.Error('invalid-id', `The post id ${postId} provided is not valid`);
        }
        return post;
    }
    static checkCommentExists(commentId) {
        const commment = Comments.findOne(commentId);
        if(!commment) {
            throw new Meteor.Error('invalid-id', 'The comment id provided is not valid');
        }
        return commment;
    }

    static isUserAllowedToDeleteComment(postId, commentId, userId) {
        this.checkPostExists(postId);
        const comment = this.checkCommentExists(commentId);
        this.checkLoggedIn(userId);

        if(userId !== comment.userId && userId !== post.userId && !this.hasRole(userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');;
        }
    }
    static isUserAllowedToDeletePost(postId, userId) {
        const post = this.checkPostExists(postId);
        this.checkLoggedIn(userId);
        if(userId !== post.userId && !this.hasRole(userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }
    static isUserAllowedToDeleteUser() {
        
    }
    // add other business logic checks here that you use throughout the app
    // something like: isUserAllowedToSeeDocument()
    // always keep decoupling your code if this class gets huge.
}