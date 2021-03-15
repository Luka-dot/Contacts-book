import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContex';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, 
        UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, CLEAR_CONTACTS, GET_CONTACTS } from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // GET Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    
    }

    // ADD contact text
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        } 
    };

    // DELETE contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
        
    };
    
    // UPDATE contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        } 
    };

    // CLEAR contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // SET current contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // FILTER contacts
    const filterContacts = (filterText) => {
        dispatch({ type: FILTER_CONTACT, payload: filterText})
    }

    // Clear filter
    const clearFiltered = () => {
        dispatch({ type: CLEAR_FILTER });
    };


    return (
        <contactContext.Provider 
            value={{ 
                contacts: state.contacts, 
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFiltered,
                clearContacts
            }} 
        
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;