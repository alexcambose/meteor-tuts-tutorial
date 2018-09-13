import { Users } from '/db';
import Security from "../../imports/api/security";

export default {
    Mutation: {
        deleteUser(_, { _id }, { userId }) {
            Security.checkRole(userId, 'admin');
            Users.remove(_id);
        }
    }
};
