import {
    compose,
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

const createReduxStore = (initialState) => {
    return (createStoreWithMiddleware)(rootReducer, initialState);
}

const loadFromLocalStorage = () => {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const saveToLocalStorage = (state) => {
    try {
        if(state.auth.isAuth){
            const serialisedState = JSON.stringify(state);
            localStorage.setItem("persistantState", serialisedState);
        }else{
            localStorage.removeItem("persistantState");
        }
    } catch (e) {
        console.warn(e);
    }
}

export default createReduxStore(loadFromLocalStorage())
