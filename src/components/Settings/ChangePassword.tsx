import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet } from '@src/actions';
import { Form } from 'semantic-ui-react';
import { postUpdateUserPassword } from '@src/api/userService';
import { validateField } from '@src/utils/validation';
import { Password } from '@src/components/Input';
import { AppContextInterface, withAppContext } from '@src/components/App/AppContext';

interface ChangePasswordProps {
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
    appContext: AppContextInterface;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({form, formUpdate, formClear, alertSet, appContext}) => {

    const [formValid, setFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState({password: '', confirmPassword: ''})
    const [fieldValid, setFieldValid] = useState({password: false, confirmPassword: false});

    const [visible, setVisible] = useState(false);

    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
        handleValidation(name, value);
    }

    useEffect(() => {
        for (const [key, value] of Object.entries(form)) {
            handleValidation(key, value)
        }
    }, [])

    useEffect(() => {
        if (form.password !== form.confirmPassword) {
            setFieldValid(fieldValid => ({...fieldValid, confirmPassword: false}));
        } else {
            setFieldValid(fieldValid => ({...fieldValid, confirmPassword: true}));
        }
    }, [form.password, form.confirmPassword]);

    useEffect(() => {
        // Set the current state of the form
        setFormValid(fieldValid.password && fieldValid.confirmPassword);
    }, [fieldValid])

    const handleValidation = (name: string, value: any) => {
        // validate the field
        const { isValid, errorMessage } = validateField(name, value, form);

        // Record whether it was valid or not
        setFieldValid(fieldValid => ({...fieldValid, [name]: isValid}));

        // Set the error message if any
        setFormErrors(formErrors => ({...formErrors, [name]: errorMessage}));

        // Set current state of the form
        setFormValid(fieldValid.password && fieldValid.confirmPassword);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        appContext.setLoading(true);

        const { isValid, errorMessage } = validateField(form.password, 'password', form);

        postUpdateUserPassword(form.password).then((res: any) => {
            alertSet('Password successfuly changed.', 'success');
            appContext.setLoading(false);
        }).catch((err: any) => {
            alertSet('Failed resetting password.', 'error');
            appContext.setLoading(false);
        });

        formClear();
    }

    return (
        <div className='settings__content'>
            <h1>Change Password</h1>
            <div className='content'>
                <label>Change Password</label>
                <Form onSubmit={handleSubmit}>
                    <div className='field password'>
                        <Password 
                            name='password'
                            placeholder='Password'
                            value={form.password ? form.password : ''}
                            onChange={handleUserInput}
                            onBlur={handleValidation}
                            enableStrengthTest={true}
                            visible={visible}
                            toggleVisibility={() => setVisible(!visible)}
                        />
                    </div>
                    {!fieldValid.password && <span className='error-label'>{formErrors.password}</span>}

                    <Form.Input
                        fluid
                        type={visible ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        maxLength={60}
                        transparent
                        value={form.confirmPassword ? form.confirmPassword : ''}
                        onChange={(e) => handleUserInput(e)}
                        onBlur={(e: any) => handleValidation(e.target.name, e.target.value)}
                    />
                    {!fieldValid.confirmPassword && <span className='error-label'>{formErrors.confirmPassword}</span>}

                    <Form.Button type='submit' disabled={!formValid}>Save</Form.Button>
                </Form>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return { 
        form: state.form
    }
}

export default connect(
    mapStateToProps,
    { formUpdate, formClear, alertSet }
)(withAppContext(ChangePassword));