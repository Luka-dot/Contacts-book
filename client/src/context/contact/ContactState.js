import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contactContex';
import contactReducer from './contactReducer';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'John',
                email: 'myemail1@email.com',
                phone: '123-123-1234',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Alice',
                email: 'myemail1ALICE@email.com',
                phone: '222-123-1234',
                type: 'professional'
            },
            {
                id: 3,
                name: 'Bob',
                email: 'BOB@email.com',
                phone: '333-123-1234',
                type: 'personal'
            }
        ]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // ADD contact text
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // DELETE contact

    // SET current contact

    // Clear current contact

    // UPDATE contact

    // FILTER contacts

    // Clear filter


    return (
        <contactContext.Provider 
            value={{ 
                contacts: state.contacts, 
                addContact
            }} 
        
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;