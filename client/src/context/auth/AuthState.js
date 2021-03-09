import React, { useReducer } from 'react';
import authContext from './AuthContext';
import authReducer from './AuthReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from '../types';

const AuthtState = props => {
    const initialState = {
        token: localStorage.getItem(null),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

   // LOAD user

   // REGISTER user

   // LOGIN user

   // Logout

   //Clear error

    return (
        <authContext.Provider 
            value={{ 
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }} 
        
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthtState;