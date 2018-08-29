import { Meteor } from 'meteor/meteor';
import {Comments} from '/db';


class CommentService {
    static create(comment, postId) {
        Comments.insert({
            ...comment,
            userId: Meteor.userId(),
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