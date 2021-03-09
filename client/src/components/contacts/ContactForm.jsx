import React, { useState, useContext } from 'react'
import ContactContext from '../../context/contact/contactContex'

const ContactForm = () => {
    const contactContex = useContext(ContactContext)

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
        contactContex.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
            <input type="phone" placeholder="phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" defaultChecked={type === 'personal'} />
            personal{' '}
            <input type="radio" name="type" value="professional" defaultChecked={type === 'professional'} onChange={onChange} />
            professional{' '}
            <div>
                <input className="btn btn-primary btn-block" type="submit" value="Add Contact" onChange={onChange} />
            </div>
        </form>
    )
}

export default ContactForm