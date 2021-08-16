import * as TYPES from './../actions/types'

const INITIAL_STATE = {
    data: [],
    selectedConsultation: null
}

function consultationReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPES.DATA_CONSULTATION:
            return {
                ...state,
                data: action.payload
            }
        case TYPES.SINGLE_CONSULTATION:
            return {
                ...state,
                selectedConsultation: action.payload
            }
        default:
            return state
    }
}

export default consultationReducer
