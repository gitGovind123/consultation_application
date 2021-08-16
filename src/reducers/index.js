import { combineReducers } from 'redux'

import auth from './authReducer'
import consultation from './consultationReducer'

export const rootReducer = combineReducers({
    auth,
    consultation
})
