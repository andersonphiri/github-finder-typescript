 
// https://www.youtube.com/watch?v=wYpCWwD1oz0
import React, {useContext, useReducer} from 'react'
import { createContext } from 'react';
import  AlertReducer,{ AlertAction, AlertStateModel, AlertState } from './AlertReducer';


export type AlertContextModel = {
    children ? : React.ReactNode;
    alert ?: AlertStateModel;
    setAlert ? : (msg: string, state: AlertState) => void;
}
export const AlertContext = createContext<AlertContextModel>({});
export const AlertProvider = ({children} : AlertContextModel ) => {
    const intialState : AlertStateModel = {state: AlertState.Unknown, message : '', show: false };
    const [state, dispatch] = useReducer(AlertReducer, intialState);

    const setAlert = (msg: string, state: AlertState) => {
        dispatch({
            type: 'SHOW_ALERT', payload: msg, state
        });
    }

    setTimeout(()=> dispatch({ type: 'REMOVE_ALERT',}), 3000);

    return (
<AlertContext.Provider value={{
    children,alert: state, setAlert
}}>
{children}
</AlertContext.Provider>
    );
}