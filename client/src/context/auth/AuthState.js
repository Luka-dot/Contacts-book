import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './AuthContext';
import authReducer from './AuthReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR } from '../types';
import setAuthToken from '../../utils/sethAuthToken';

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
   const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth')

            dispatch({ 
                type: USER_LOADED, 
                payload: res.data 
            })
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
   }

   // REGISTER user
   const register = async formData => {
       const config = {
        headers: {
            'Content-Type': 'application/json'
          }
       }

       try {                // only need /api/ since proxy value is defined in package.json
           const res = await axios.post('/api/users', formData, config);

           dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data
           });

           loadUser()
       } catch (err) {
           dispatch({
               type: REGISTER_FAIL,
               payload: err.response.data.msg
           })
       }
   }

   // LOGIN user
   const login = () => console.log('login')

   // Logout
   const logout = () => console.log('logout')

   //Clear error
   const clearError = () => dispatch({ type: CLEAR_ERRORS })

    return (
        <authContext.Provider 
            value={{ 
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                loadUser,
                register,
                login,
                logout,
                clearError
            }} 
        
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthtState;