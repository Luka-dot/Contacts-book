import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { login, error, clearError, isAuthenticated } = authContext

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/')
        }

        if (error === 'Invalid credentials.') {
            setAlert(error, 'danger')
            clearError()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger')
        } else {
        login({ email, password})
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account<span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmitHandler} >
                <div className="form-groups">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChangeHandler} required/>
                </div>
                <div className="form-groups">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChangeHandler} required/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login