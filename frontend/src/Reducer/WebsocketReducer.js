import * as autobahn from "autobahn";
import {Store} from '../Store/Store';
import {addSession} from "../Action/SessionAction";

export default function WebsocketReducer(state = false, action) {
    switch (action.type) {
        case 'CONNECT':
            const onChallenge = (session, method, extra) => {
                if (method === 'JWT') {
                    return action.jwt;
                }
            }

            const conn =  new autobahn.Connection({
                url: 'ws://localhost:9090',
                realm: 'privateChat',
                onchallenge: onChallenge,
                authmethods: ['JWT'],
            });

            conn.onopen = (session) => {
                Store.dispatch(addSession(session));
                // session.publish('toto', ['tata']);
            }

            conn.open();

            return conn;

        case 'DISCONNECT':
            return false;

        default:
            return state;
    }
}