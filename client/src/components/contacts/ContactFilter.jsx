import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContex'

const ContactFilter = () => {
    const contactContex = useContext(ContactContext)
    const { filterContacts, clearFiltered, filtered } = contactContex

    const text = useRef()

    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = (e) => {
        if(text.current.value !== '') {
            filterContacts(e.target.value)
        } else {
            clearFiltered()
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts ..." onChange={onChange}/>
            
        </form>
    )
}

export default ContactFilter