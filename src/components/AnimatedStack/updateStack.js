import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User, Match } from '../../models';

const hasNotPassed = (item, u) => {
    if (!item.swipes) return true;
    if (!item.swipes[0]) return true;
    let hasSwiped = item.swipes.filter(e => 
        e.sub == u
    );
    if (!hasSwiped[0]) return true;
    return hasSwiped[0].like;
}

const hasNotMatched = (item, id, matches, sub) => {
    if (!id) return true;
    let isNotMatched = true;
    matches.forEach(e => {
        if (e.User1 == item.sub || e.User2 == item.sub) {
            isNotMatched = false;
        }
    })
    return isNotMatched;
}

const queryProfileStack = async (sub, gender, lookingfor, id) => {
    try {
        if (!sub) return;
        //const matches = await DataStore.query(Match, u => u.User1("eq", sub));
        const matches = await DataStore.query(Match, c => c.or(
            c => c.User1("eq", sub).User2("eq", sub)
          ));
        console.log('matches',matches);
        //1. fetch all users that don't have Auth user's sub and
        //2. grab only uses who are looking for the Auth user's gender
        const dbUsers = await DataStore.query(User, u => u.sub("ne", sub).lookingfor("contains", gender));
        if (!dbUsers) return;
        let stack = [];
        /*
        1. filter all users whose gender is not included in Auth user's lookingfor
        2. filter all users who have not "passed" on Auth user
        BUT keep all users who haven't swiped on Auth user
         */
        let filteredUsers = dbUsers.filter(e => 
            lookingfor.indexOf(e.gender) >= 0).filter(f =>
                hasNotPassed(f, sub)).filter(g =>
                    hasNotMatched(g, id, matches, sub)
                );
        filteredUsers.forEach(e => stack.push(e.sub));
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