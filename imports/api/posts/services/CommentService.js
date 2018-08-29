import {Comments} from '/db';
import Security from "../../security";


class CommentService {
    static create(comment, postId) {
        Comments.insert({
            ...comment,
            userId: this.userId,
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