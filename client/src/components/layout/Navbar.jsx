import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../context/auth/AuthContext'
import ContactContext from '../../context/contact/contactContex'

const Navbar = () => {
    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)

    const { isAuthenticated, logout, user } = authContext
    const { clearContacts } = contactContext

    const onLogout = () => {
        logout()
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className="hide-sm" >Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>    
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
            <FontAwesomeIcon icon={faAddressBook} /> My  contacts
            </h1> 
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
}

export default Navbar


/*
<li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>

*/