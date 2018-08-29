import {Meteor} from 'meteor/meteor'
import PostService from "./services/PostService";

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
        PostService.remove(_id);
    },

    'post.get' (_id) {
        return PostService.get(_id);
    },

    'post.view' (_id) {
        return PostService.viewFull(_id);
    },
});