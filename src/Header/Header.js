import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-sevice';
import './Header.css';

/*
* Used to create the Header and add Login, Log out and Registration opitions.
*/ 
export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        console.log('have a token')
        return (
            <div className='Header__logged-in'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'
                >
                    Log out
                </Link>
            </div>
        )
    }

    renderSideBar() {
        return (
            <div className='sidebar'>
                <Link 
                    to='/dashboard'
                >
                    <li>Dashboard</li>
                </Link>

                <Link 
                    to='/expenses'
                >
                    <li>Expenses</li>
                </Link>

                <Link 
                    to='/addExpense'
                >
                    <li>Add Expense</li>
                </Link>
            </div>
        );
    }

    renderLoginLink() {
        console.log('have 0 tokens')
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/login'
                >
                    Log in
                </Link>
                <Link
                    to='/register'
                >
                    Register
                </Link>
            </div>
        )
    }
    render() {
        return (
            <nav className='Header'>
                <h1>
                        RedZone
                </h1>

                <section className='SignOut'>
                    {
                        TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink()
                    }
                </section>
            </nav>
        );
    }
}
