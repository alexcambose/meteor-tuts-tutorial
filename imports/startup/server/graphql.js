import { initialize } from 'meteor/cultofcoders:apollo';
import { load } from 'graphql-load';
import { initAccounts } from 'meteor/cultofcoders:apollo-accounts';
import Posts from '/db/posts/collection';
import PostType from '/db/posts/Post.gql';
import CommentsType from '/db/comments/Comments.gql';
import CommentsResolver from '/db/comments/Comment.resolver';
import PostResolver from '/db/posts/Post.resolver';
import UserResolver from '/db/users/User.resolver';

import UserType from '/db/users/User.gql';


const AccountsModule = initAccounts({
    loginWithFacebook: false,
    loginWithGoogle: false,
    loginWithLinkedIn: false,
    loginWithPassword: true,
});

load({
    typeDefs: [PostType, CommentsType, UserType],
    resolvers: [PostResolver, CommentsResolver, UserResolver],
});

initialize();