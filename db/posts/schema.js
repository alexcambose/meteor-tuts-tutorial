import SimplSchema from 'simpl-schema';
import {PostTypesEnum} from "../../imports/api/posts/enums/types";
SimplSchema.extendOptions(['autoform']);
export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: Number,
        defaultValue: 0,
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    type: {
        type: String,
        defaultValue: Object.values(PostTypesEnum)[0],
        allowedValues: Object.values(PostTypesEnum),
    }
});