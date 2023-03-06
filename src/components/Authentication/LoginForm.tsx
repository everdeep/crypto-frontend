import React from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { signIn, formUpdate, formClear, alertSet } from '@src/actions';
import { login, loginGoogle } from '@src/api/authService';

import './auth.scss';

interface LoginFormProps {
    form: any;
    signIn: (payload: any) => void;
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
            signIn(res.data);
            formClear();
        }).catch((err: any) => {
            alertSet('The username or password is incorrect.', 'error');
        });
    }

    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse);
            // signIn
            loginGoogle(codeResponse.code)
            .then((res: any) => {
                signIn(res.data);
                formClear();
                // Possibly add a navigate here
            }).catch((err: any) => {
                alertSet('The username or password is incorrect.', 'error');
            });
        },
        flow: 'auth-code',
    });
    
    return (
        <div className='__container'>
            <div className='__header'>
                <div className='main-heading'>
                    <h1>Login</h1>
                </div>
            </div>
            <div className='__body'>
                <Form>
                    <Form.Input
                        fluid
                        type='text'
                        placeholder='Username'
                        name='username'
                        maxLength={60}
                        transparent
                        value={form.username ? form.username : ''}
                        onChange={(e) => handleUserInput(e)}
                    />
                    <Form.Input
                        fluid
                        type='password'
                        placeholder='Password'
                        name='password'
                        maxLength={60}
                        transparent
                        value={form.password ? form.password : ''}
                        onChange={(e) => handleUserInput(e)}
                    />
                    <Form.Button onClick={handleSubmit}>Login</Form.Button>
                    <button className='ui red google button' onClick={() => googleLogin()}>
                        <i className='google icon' />
                        Sign In With Google
                    </button>
                </Form>
            </div>
           
            <div className='__footer'>
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