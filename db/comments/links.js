import { Posts, Comments, Users } from '../index';

Comments.addLinks({
    'post': {
        type: 'one',
        collection: Posts,
        field: 'postId',
    },
    'user': {
        type: 'one',
        collection: Users,
        field: 'userId'
    }
});
