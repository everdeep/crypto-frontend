import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Link , useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '@src/api/authService';
import { validateField } from '@src/utils/validation';
import { formUpdate, formClear, alertSet } from '@src/actions';

import './auth.scss'

interface RegisterFormProps {
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({form, formUpdate, formClear, alertSet}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState({email: '', password: '', confirmPassword: ''})
    const [fieldValid, setFieldValid] = useState({email: false, password: false, confirmPassword: false});
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    useEffect(() => {
        for (const [key, value] of Object.entries(form)) {
            handleValidation(key, value)
        }
    }, [])

    useEffect(() => {
        // Set the current state of the form
        setFormValid(fieldValid.email && fieldValid.password && fieldValid.confirmPassword);
    }, [fieldValid])

    const handleValidation = (name: string, value: any) => {
        // validate the field
        const { isValid, errorMessage } = validateField(name, value, form);

        // Record whether it was valid or not
        setFieldValid(fieldValid => ({...fieldValid, [name]: isValid}));

        // Set the error message if any
        setFormErrors(formErrors => ({...formErrors, [name]: errorMessage}));

        // Set current state of the form
        setFormValid(fieldValid.email && fieldValid.password && fieldValid.confirmPassword);
    }

    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
    }

    const handleSubmit = (e: any) => {

        e.preventDefault();

        if (!termsAndConditions) {
            alertSet('You must agree to the terms and conditions.', 'error');
            return;
        }

        register(form.username, form.password, form.email)
        .then((res) => {
            formClear();
            setLoading(false);
            alertSet('Account successfully created.', 'success');
            navigate('/login');
        }).catch((err) => {
            // TODO: remove this
            console.log(err);
            setLoading(false);
            alertSet('There was an issue with your registration.', 'error');
        })
    }

    const renderForm = () => {
        if (loading) {
            return <div>Loading...</div>
        } else {
            return (
                <div className='__container'>
                    <div className='__header'>
                        <div className='main-heading'>
                            <h1>Register an Account</h1>
                        </div>
                    </div>
                    <div className='__body'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Input fluid
                                type='text'
                                placeholder='First name'
                                name='firstName'
                                maxLength={60}
                                transparent
                                value={form.firstName ? form.firstName : ''}
                                onChange={(e) => handleUserInput(e)}
                                onBlur={(e: any) => handleValidation(e.target.name, e.target.value)}
                            />
                            <Form.Input fluid
                                type='text'
                                placeholder='Last name'
                                name='lastName'
                                maxLength={60}
                                transparent
                                value={form.lastName ? form.lastName : ''}
                                onChange={(e) => handleUserInput(e)}
                                onBlur={(e: any) => handleValidation(e.target.name, e.target.value)}
                            />

                            <Form.Input
                                fluid
                                type='text'
                                placeholder='Email'
                                name='email'
                                required={true}
                                maxLength={60}
                                transparent
                                value={form.email ? form.email : ''}
                                onChange={(e) => handleUserInput(e)}
                                onBlur={(e: any) => handleValidation(e.target.name, e.target.value)}
                            />
                            {!fieldValid.email && <span className='error-label'>{formErrors.email}</span>}

                            <Form.Input
                                fluid
                                type='password'
                                placeholder='Password'
                                name='password'
                                required={true}
                                maxLength={60}
                                transparent
                                value={form.password ? form.password : ''}
                                onChange={(e) => handleUserInput(e)}
                                onBlur={(e: any) => {
                                    handleValidation(e.target.name, e.target.value);
                                    if (form.confirmPassword) {
                                        handleValidation('confirmPassword', form.confirmPassword);
                                    }
                                }}
                            />
                            {!fieldValid.password && <span className='error-label'>{formErrors.password}</span>}

                            <Form.Input
                                fluid
                                type='password'
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                required={true}
                                maxLength={60}
                                transparent
                                value={form.confirmPassword ? form.confirmPassword : ''}
                                onChange={(e) => handleUserInput(e)}
                                onBlur={(e: any) => {
                                    handleValidation(e.target.name, e.target.value);
                                    if (form.password) {
                                        handleValidation('password', form.password);
                                    }
                                }}
                            />
                            {!fieldValid.confirmPassword && <span className='error-label'>{formErrors.confirmPassword}</span>}

                            <Form.Checkbox
                                label='I agree to the Terms and Conditions'
                                required={true}
                                checked={termsAndConditions}
                                onChange={() => setTermsAndConditions(!termsAndConditions)}
                            />
                            <Form.Button type='submit' disabled={!formValid || !termsAndConditions}>Register</Form.Button>
                        </Form>
                    </div>
                    
                    <div className='__footer'>
                        <div className='center'>
                            <Link to='/login' onClick={() => formClear()}><u>Already have an account?</u></Link>
                            <br /><br/>
                            <Link to='/' onClick={() => formClear()}><u>Go back</u></Link>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        renderForm()        
    )
}

const mapStateToProps = (state: any) => {
    return { 
        form: state.form
    }
}

export default connect(
    mapStateToProps,
    { formUpdate, formClear, alertSet }
)(RegisterForm);