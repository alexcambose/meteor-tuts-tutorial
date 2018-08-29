import {Meteor} from 'meteor/meteor'
import {Posts, Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;
        Posts.insert(post);
    },

    'secured.post_list' () {
        return Posts.find().fetch();
    },

    'secured.post_edit' (_id, postData) {
        Posts.update({_id: _id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    },

    'secured.post_remove' (_id){
        Posts.remove({_id: _id, userId: this.userId});
    },

    'secured.post_get' (_id) {
        return Posts.findOne(_id);
    },

    'secured.post_create_comment' (postId, comment) {
        Security.checkPostExists(postId);
        Security.checkLoggedIn(this.userId);

        Comments.insert({
            ...comment,
            userId: this.userId,
            postId,
        });
    },

    'secured.post_delete_comment' (postId, commentId) {
        Security.isUserAllowedToDeleteComment(postId, commentId, this.userId);
        Comments.remove({ _id: commentId });
    }
});