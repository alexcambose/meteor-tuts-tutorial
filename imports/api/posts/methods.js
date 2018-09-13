import {Meteor} from 'meteor/meteor'
import PostService from "./services/PostService";
import Security from '/imports/api/security';

Meteor.methods({
    'post.create'(post) {
        PostService.create(post);
    },

    'post.list' () {
        return PostService.getAll();
    },

    'post.edit' (_id, post) {
        PostService.edit(_id, post);
    },

    'post.remove' (_id){
        Security.isUserAllowedToDeletePost(_id, this.userId);
        PostService.remove(_id);
        console.log('post', _id)
    },

    'post.get' (_id) {
        return PostService.get(_id);
    },

    'post.view' (_id) {
        return PostService.viewFull(_id);
    },
});