import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
            case UPDATE_CONTACT:
                return {
                    ...state,
                    contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact)
                };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload 
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi')   // 'gi' -> is global and insensitive (case insensitive for upper and lowercase).
                    return contact.name.match(regex) || contact.email.match(regex)       //  match() is a function available on RegEx
                    /*   RegExp is same as below code
                        filtered: state.contacts.filter(contact => {
                        return (
                            contact.name.toLowerCase().includes(action.payload) ||
                            contact.email.toLowerCase().includes(action.payload)
                        );
                    */
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };        

        default:
            return state
    }
};