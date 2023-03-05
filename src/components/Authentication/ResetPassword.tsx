import React from 'react';
import {
    Form,
} from 'semantic-ui-react';
import { Link , useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet } from '@src/actions';

import './auth.scss';

interface ResetPasswordProps {
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({form, formUpdate, formClear, alertSet}) => {
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

    return (
        <div className='__container'>
            <div className='__header'>
                <div className='main-heading'>
                    <h1>Reset password</h1>
                </div>
            </div>
            <div className='__body'>
                <div className='ui input transparent form'>
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
                        <Form.Button type='submit'>Reset</Form.Button>
                    </Form>
                </div>
            </div>
            <div className='__footer'>
                <div className='center'>
                    <Link to='/login' onClick={() => formClear()}><u>Back to login</u></Link>
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
    { formUpdate, formClear, alertSet }
)(ResetPassword);