import CommentService from '/imports/api/posts/services/CommentService';
import { Comments } from '/db';

export default {

    Mutation: {
        createComment(_, { text, postId }, { userId }) {
            console.log(this);
            CommentService.create(text, postId, userId);
        },
        deleteComment(_, { _id }) {
            CommentService.remove(_id);
        },
    }
};
