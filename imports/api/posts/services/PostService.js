import { Meteor } from 'meteor/meteor';
import {Posts} from '/db';
import CommentService from './CommentService';

class PostService {
    static create(post, userId) {
        Posts.insert({ ...post, userId });
    }
    // static getAll(){
    //     const query = Posts.createQuery({
    //         title: 1,
    //         description: 1,
    //         createdAt: 1,
    //         user: {
    //             _id: 1,
    //             emails: 1
    //         },
    //         comments: {
    //             text: 1,
    //             user: {
    //                 emails: 1
    //             }
    //         },
    //     });
    //
    //     return query.fetch();
    // }
    static edit(_id, { title, description, type }) {
        Posts.update(_id, {
            $set: {
                title,
                description,
                type,
            }
        });
    }

    static get(_id = null) {
        const query = Posts.createQuery({
            // $filters: {_id},
            title: 1,
            description: 1,
            createdAt: 1,
            type: 1,
            views: 1,
            user: {
                _id: 1,
                emails: 1
            },
            comments: {
                text: 1,
                user: {
                    emails: 1
                }
            },
        });
        return query.fetch();
    }
    static markAsViewed(_id) {
        Posts.update(_id, {
            $inc: { views: 1 }
        });
    }
    static viewFull(_id) {
        this.markAsViewed(_id);
        const query = Posts.createQuery({
            $filters: {_id},
            title: 1,
            description: 1,
            createdAt: 1,
            views: 1,
            type: 1,
            comments: {
                text: 1,
                user: {
                    emails: 1
                }
            },
            user: {
                emails: 1
            }
        });
        return query.fetchOne();
    }
    static remove(_id) {
        CommentService.removeAllFromPost(_id);
        Posts.remove(_id);
    }
}

export default PostService;