import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContex';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContex = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContex;
    
    useEffect(() => {
        getContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>No contacts, maybe add some...</h4>
    }

    return (
        <Fragment>
            { contacts !== null && !loading ? (
                <TransitionGroup>
                {filtered !== null ? filtered.map(contact => (
                    <CSSTransition key={contact._id} timeout={250} classNames="item" >
                        <ContactItem  contact={contact} />
                    </CSSTransition>
                )) : contacts.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                ))}  
            </TransitionGroup>
            ) : <Spinner /> }
            
        </Fragment>
    )
}

export default Contacts