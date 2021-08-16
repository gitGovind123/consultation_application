import * as TYPES from './types'

export function loginUser (data) {
    localStorage.setItem('isAuth', 'true')
    return dispatch => {
        dispatch({ type: TYPES.IS_AUTH, payload: true })
        dispatch({ type: TYPES.USER_LOGGED, payload: data })
    }
}

export function logoutUser () {
    localStorage.removeItem('isAuth')
    localStorage.removeItem('persistantState')
    return dispatch => {
        dispatch({ type: TYPES.IS_AUTH, payload: false })
    }
}

