

export type AlertAction = {
    type: 'SHOW_ALERT'; payload: string , state: AlertState
} | {type: 'REMOVE_ALERT'}
export enum AlertState {
    Error,
    Normal,
    Unknown
}

export  type AlertStateModel = {
 show: boolean,
 message: string,
 state: AlertState,
}

const AlertReducer = (state: AlertStateModel, action : AlertAction) : AlertStateModel => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {show: true, message: action.payload, state: action.state}
        case 'SHOW_ALERT':
            return { show: false, message: '', state: AlertState.Unknown }
        default:
            return {show: false, message: '', state: AlertState.Unknown}
    }
}

export default AlertReducer;
