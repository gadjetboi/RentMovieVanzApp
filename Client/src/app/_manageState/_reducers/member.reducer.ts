import * as MemberAction from "../_actions/member.actions";
import { MemberModel } from "../_stateModels/memberModel";

const defaultState: MemberModel = {
    userName: ""
}

export type Action = MemberAction.All;

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
}

export function memberReducer(state = defaultState, action) {
    switch (action.type) {
        case MemberAction.LOGIN:
            return newState(state, { userName: action.payload });
        case MemberAction.LOGOUT:
            return newState(state, { userName: "" });
        default:
            return state;
    }
}

