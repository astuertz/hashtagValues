import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';

const queryProfileStack = async (sub, gender, lookingfor) => {
    try {
        if (!sub) return;
        const dbUsers = await DataStore.query(User, u => u.sub("ne", sub).lookingfor("contains", gender));
        if (!dbUsers) return;
        const stack = [];
        for (i=0; i < dbUsers.length; i++) {
            if (lookingfor.indexOf(dbUsers[i].gender) >= 0) {
                stack.push(dbUsers[i].sub);
            }
        }
        /*
        let dbU = await DataStore.query(User, u => u.sub("eq", sub));
        let u = dbU[0];
        await DataStore.save(User.copyOf(u, updated => {
        updated.stack = stack;
        }));
        */
        return stack;
    } catch (e) {
        console.log(e.message);
    }
}

export default queryProfileStack;