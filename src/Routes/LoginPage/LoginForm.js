/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import RedZoneContext from '../../RedZoneContext';
import TokenService from '../../services/token-sevice';
import AuthApiService from '../../services/auth-api-service';
import { Button2, Form, Input2, Required } from '../../Utils';
import './LoginForm.css';


/*
* Used to create login form and to activated JWT Authentication.
*/ 
export default class LoginForm extends Component {
    static contextType = RedZoneContext;

    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null }
/*
*Function used compare user info with the credentials and recieve a token for access.
*/ 
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
        .then(res => {
            this.context.updateUserInfo(user_name.value)
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
        })


        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {
        const { error } = this.state;
        return (
                 <Form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
                    <div role='alert'>{error && <p className='red'>{error}</p>}</div>
                    <div className='user_name'>
                        <h2 className='login'>Login</h2>
                        <hr />
                        <label htmlFor='LoginForm__user_name'>
                            Username <Required />
                        </label>
                        <Input2
                            required
                            name='username'
                            id='user_name'
                            autoComplete='off'
                            placeholder='Demo123'
                       ></Input2>
                    </div>

                    <div className='password'>
                        <label htmlFor='LoginForm__password'>
                            Password <Required />
                       </label>
                       <Input2
                            required
                            name='password'
                            type='password'
                            id='password'
                            placeholder='Demo123@'
                            autoComplete='off'
                        ></Input2>
                    </div>
                    <Button2 type='submit'>Log In</Button2>
                  </Form>
        );
    }
}