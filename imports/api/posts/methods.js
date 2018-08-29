import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        const { title, description, type } = post;
        Posts.update(_id, {
            $set: {
                title,
                description,
                type,
            }
        });
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },

    'post.view' (_id) {
        Posts.update(_id, {
            $inc: { views: 1 }
        });
        return Posts.findOne(_id);
    }
});