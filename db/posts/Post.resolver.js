import PostService from '/imports/api/posts/services/PostService';
import { Posts } from '/db';

export default {
    Query: {
        posts(_, { _id }) {
            return PostService.get(_id);
        }
    },
    Mutation: {
        createPost(_, params, { userId }) {
            PostService.create(params, userId);
        },
        deletePost(_, { _id }) {
            console.log(_id);
            PostService.remove(_id);
        },
        editPost(_, { _id, ...data }) {
            PostService.edit(_id, data);
        },
        incrementView(_, { _id }) {
            PostService.markAsViewed(_id);
        }
    }
};
