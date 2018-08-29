import {Posts, Comments} from '../index';

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'user'
    },
    'comments': {
        type: 'many',
        collection: Comments,
        inversedBy: 'user',
    }
});
