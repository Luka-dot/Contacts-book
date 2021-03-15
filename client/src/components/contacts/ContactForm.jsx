import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContex'

const ContactForm = () => {
    const contactContex = useContext(ContactContext)
    const { addContact, current, clearCurrent, updateContact } = contactContex

    useEffect(() => {
        if(current !== null) {
            setContact(current)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContex, current])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email,phone, type } = contact;

    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
        } else {
            updateContact(contact)
            clearAll()
        }
        
    };

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit contact' : 'Add contact'}</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
            <input type="phone" placeholder="phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />
            personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />
            professional{' '}
            <div>
                <input className="btn btn-primary btn-block" type="submit" value={current ? 'Update contact' : 'Add contact'} onChange={onChange} />
            </div>
            {current && <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>}
        </form>
    )
}

export default ContactForm