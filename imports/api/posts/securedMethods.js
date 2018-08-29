import {Meteor} from 'meteor/meteor'
import Security from '/imports/api/security';
import CommentService from "./services/CommentService";
import PostService from "./services/PostService";

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        PostService.create(post);
    },

    'secured.post_list' () {
        Security.checkLoggedIn(this.userId);
        return PostService.getAll();
    },

    'secured.post_edit' (_id, postData) {
        Security.checkLoggedIn(this.userId);
        //more checks...
        PostService.edit(_id, postData);
    },

    'secured.post_remove' (_id){
        Security.checkLoggedIn(this.userId);
        //more checks...
        PostService.remove(_id);
    },

    'secured.post_get' (_id) {
        Security.checkLoggedIn(this.userId);
        //more checks...

        return PostService.get(_id);
    },

    'secured.post_create_comment' (postId, comment) {
        Security.checkPostExists(postId);
        Security.checkLoggedIn(this.userId);

        CommentService.create(comment, postId);
    },

    'secured.post_delete_comment' (postId, commentId) {
        Security.isUserAllowedToDeleteComment(postId, commentId, this.userId);
        CommentService.remove(commentId);
    }
});