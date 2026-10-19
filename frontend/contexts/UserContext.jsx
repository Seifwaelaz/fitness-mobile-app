import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState , useReducer } from "react";

export const UserContext = createContext()

export const authReducer = (state, action) => {

    switch(action.type)
    {
        case 'LOGIN':
            return { user : action.payload}
        case 'LOGOUT':
            return { user : null}
        case 'UPDATE_PROFILE':
            return { user: {...state.user, ...action.payload} }
        default:
            return state
    }

}


export function UserContextProvider({children}) {

    const [state, dispatch] = useReducer(authReducer, { user: null})
    const [authChecked, setAuthChecked] = useState(false)

    const getInitialValue = async () => {
        let user = await AsyncStorage.getItem('user')

        if(user)
        {
            user = JSON.parse(user)
            dispatch({type:'LOGIN', payload: user})
        }

        setAuthChecked(true)

    }

    useEffect(()=> {
        getInitialValue()
    }, [])

    return (
        <UserContext.Provider value={{...state, dispatch, authChecked}}>
            {children}
        </UserContext.Provider>
    )
}