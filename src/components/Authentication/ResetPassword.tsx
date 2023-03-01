import React from 'react';
import {
    Form,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet } from '../../actions';
import { Navigate, useNavigate } from 'react-router-dom';

import './auth.scss';

interface ResetPasswordProps {
    isSignedIn: boolean;
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({isSignedIn, form, formUpdate, formClear, alertSet}) => {
    const navigate = useNavigate();
    
    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alertSet('If the email exists, a new password will be sent out.', 'success')
        navigate('/login');
        formClear();
    }

    const renderForm = () => {
        if (isSignedIn) {
            return <Navigate to='/' />;
        } else {
            return (
                <div id='erwt'>
                    <div className='header'>
                        <div className='main-heading'>
                            <h1>Reset password</h1>
                        </div>
                    </div>
                    <div className='ui form'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid label='Username'
                                type='text'
                                placeholder='Username'
                                name='username'
                                maxLength={60}
                                value={form.username ? form.username : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <Form.Button type='submit'>Reset</Form.Button>
                        </Form>
                    </div>
                    <div className='footer'>
                        <div className='center'>
                            <Link to='/login' onClick={() => formClear()}><u>Back to login</u></Link>
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
        isSignedIn: state.auth.isSignedIn,
        form: state.form
    }
}

export default connect(
    mapStateToProps,
    { formUpdate, formClear, alertSet }
)(ResetPassword);