import React from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, formUpdate, formClear, alertSet } from '@src/actions';
import { login } from '@src/api/authService';

import './auth.scss';

interface LoginFormProps {
    form: any;
    signIn: (email: string, accessToken: string) => void;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, signIn, formUpdate, formClear, alertSet }) => {

    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Submit
        login(form.username, form.password)
        .then((res: any) => {
            signIn(res.email, res.accessToken);
            formClear();
            // Possibly add a navigate here
        }).catch((err: any) => {
            alertSet('The username or password is incorrect.', 'error');
        });
    }

    
    return (
        <div id='erwt'>
            <div className='header'>
                <div className='main-heading'>
                    <h1>Login</h1>
                </div>
            </div>
            <div className='ui form'>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        type='text'
                        placeholder='Username'
                        name='username'
                        maxLength={60}
                        value={form.username ? form.username : ''}
                        onChange={(e) => handleUserInput(e)}
                    />
                    <Form.Input
                        fluid
                        type='password'
                        placeholder='Password'
                        name='password'
                        maxLength={60}
                        value={form.password ? form.password : ''}
                        onChange={(e) => handleUserInput(e)}
                    />
                    <Form.Button type='submit'>Login</Form.Button>
                </Form>
            </div>
            <div className='footer'>
                <div className='center'>
                    <Link to='/reset-password' onClick={() => formClear()}><u>Forgot password?</u></Link>
                    <br />
                    <Link to='/register' onClick={() => formClear()}><u>Don't have an account?</u></Link>
                    <br /><br/>
                    <Link to='/' onClick={() => formClear()}><u>Go back</u></Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { 
        form: state.form
    }
}

export default connect(
    mapStateToProps,
    { signIn, formUpdate, formClear, alertSet }
)(LoginForm);