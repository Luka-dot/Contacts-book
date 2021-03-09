import React, { useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Alert = () => {
    const alertContext = useContext(AlertContext)

    const { alerts } = alertContext

    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <FontAwesomeIcon icon={faInfoCircle} />{alert.msg}
            </div>
        ))
    )
}

export default Alert