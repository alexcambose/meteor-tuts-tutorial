import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    _id: {type: String},
    emails: {type: Array},
    'emails.$': {type: Object},
    'emails.$.address': {type: String},
    'emails.$.verified': {type: Boolean},
    roles: {
        type: Array,
        optional: true,
    },
    'roles.$': {type: String},
    createdAt: {type: Date},
    services: {type: Object, blackbox: true},
});
