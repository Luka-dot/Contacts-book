import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Register = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { register, error, clearError, isAuthenticated } = authContext

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }

        if (error === 'user already exists.') {
            setAlert(error, 'danger')
            clearError()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account<span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmitHandler} >
                <div className="form-groups">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChangeHandler} />
                </div>
                <div className="form-groups">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChangeHandler} />
                </div>
                <div className="form-groups">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChangeHandler} minLength="6"/>
                </div>
                <div className="form-groups">
                    <label htmlFor="password2">Verify password</label>
                    <input type="password" name="password2" value={password2} onChange={onChangeHandler} minLength="6" />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register