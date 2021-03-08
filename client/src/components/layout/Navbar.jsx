import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <div className="navbar bg-primary">
            <h1>
            <FontAwesomeIcon icon={faAddressBook} /> My  contacts
            </h1> 
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
