import { Meteor } from 'meteor/meteor';
import {Comments} from '/db';


class CommentService {
    static create(text, postId, userId) {
        Comments.insert({
            text,
            userId,
            postId,
        });
    }

    static removeAllFromPost(postId) {
        Comments.remove({ postId });
    }
    static remove(_id) {
        Comments.remove({ _id });
    }
}

export default CommentService;