import * as TYPES from './types'
import axios from 'axios';
import * as csv from 'csvtojson';

export const setData = (data) => {
    return dispatch => {
        dispatch({ type: TYPES.DATA_CONSULTATION, payload: data })
    }
}

export const singleConsultation = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: TYPES.SINGLE_CONSULTATION,
            payload: getState().consultation.data.find(i => i.id === id)
        })
    }
}

export const onEscalate = (id,reason) => {
    return (dispatch, getState) => {
        const data = getState().consultation.data.map(i=>{
            if (i.id === id) {
                const d = new Date();
                const month = (+d.getMonth() + 1) > 9 ? +d.getMonth() + 1 : "0" + (+d.getMonth() + 1)
                const date = (+d.getDate()) > 9 ? d.getDate() : "0" + d.getDate()
                const hour = (+d.getHours()) > 9 ? d.getHours() : "0" + d.getHours()
                const minutes = (+d.getMinutes()) > 9 ? d.getMinutes() : "0" + d.getMinutes()
                const seconds = (+d.getSeconds()) > 9 ? d.getSeconds() : "0" + d.getSeconds()
                i.updationDate = d.getFullYear() + "-" + month + "-" + date + " " +
                    hour + ":" + minutes + ":" + seconds;
                i.status = TYPES.ENUM_STATUS.ESCALATE
                i.reason = reason
                dispatch({
                    type: TYPES.SINGLE_CONSULTATION,
                    payload: i
                })
            }
            return i
        })
        dispatch(setData(data))
    }
}

export const onPrescribe = (id,reason) => {
    return (dispatch, getState) => {
        const data = getState().consultation.data.map(i=>{
            if (i.id === id) {
                const d = new Date();
                const month = (+d.getMonth() + 1) > 9 ? +d.getMonth() + 1 : "0" + (+d.getMonth() + 1)
                const date = (+d.getDate()) > 9 ? d.getDate() : "0" + d.getDate()
                const hour = (+d.getHours()) > 9 ? d.getHours() : "0" + d.getHours()
                const minutes = (+d.getMinutes()) > 9 ? d.getMinutes() : "0" + d.getMinutes()
                const seconds = (+d.getSeconds()) > 9 ? d.getSeconds() : "0" + d.getSeconds()
                i.updationDate = d.getFullYear() + "-" + month + "-" + date + " " +
                    hour + ":" + minutes + ":" + seconds;
                i.status = TYPES.ENUM_STATUS.PRESCRIBE
                i.reason = reason
                dispatch({
                    type: TYPES.SINGLE_CONSULTATION,
                    payload: i
                })
            }
            return i
        })
        dispatch(setData(data))
    }
}

export const fetchAllData = () => {
    return (dispatch, getState) => {
        if (getState().consultation.data.length === 0) {
            return axios.get(`${window.location.origin}/interview-consultations.csv`,
                { responseType: 'blob' })
                .then(response=> {
                    const reader = new FileReader();
                    reader.onload = () => {
                        csv({noheader: true, output: "json"})
                            .fromString(reader.result)
                            .then((csvRows) => {
                                const toJson = []
                                csvRows.forEach((aCsvRow, i) => {
                                    if (i !== 0) {
                                        const builtObject = {}
                                        builtObject['status'] = TYPES.ENUM_STATUS.PRESCRIBE
                                        Object.keys(aCsvRow).forEach((aKey) => {
                                            const valueToAddInBuiltObject = aCsvRow[aKey];
                                            const keyToAddInBuiltObject = csvRows[0][aKey];
                                            builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                                        })
                                        toJson.push(builtObject)
                                    }
                                })
                                dispatch(setData(toJson))
                            })
                    };
                    reader.readAsBinaryString(response.data);
                })
        } else {
            return
        }
    }
}

