import * as TYPES from './../actions/types'

const INITIAL_STATE = {
    user: null,
    isAuth: false
}

function authReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case TYPES.USER_LOGGED:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default authReducer
