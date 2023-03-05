import React from 'react';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet } from '@src/actions';

import { Form } from 'semantic-ui-react';

interface ProfileDetailsProps {
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({form, formUpdate, formClear, alertSet}) => {

    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Submit

        formClear();
    }

    return (
        <div className='settings__content'>
            <h1>Profile Details</h1>
            <div id='generalInfo' className='content'>
                <label>General Info</label>
                <Form onSubmit={handleSubmit}>
                    <div className='ui vertically divided grid'>
                        <div className='two column row'>
                            <Form.Input
                                fluid
                                className='column'
                                type='text'
                                placeholder='First Name'
                                name='firstName'
                                maxLength={60}
                                transparent
                                value={form.firstName ? form.firstName : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <Form.Input
                                fluid
                                className='column'
                                type='text'
                                placeholder='Last Name'
                                name='lastName'
                                maxLength={60}
                                transparent
                                value={form.lastName ? form.lastName : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div className='row'>
                            <Form.Input
                                    fluid
                                    className='column'
                                    type='text'
                                    placeholder='Email'
                                    name='email'
                                    maxLength={60}
                                    transparent
                                    value={form.email ? form.email : ''}
                                    onChange={(e) => handleUserInput(e)}
                                />
                        </div>
                        <div className='two column row'>
                            <Form.Input
                                fluid
                                className='column'
                                type='tel'
                                placeholder='Phone Number'
                                name='phoneNumber'
                                maxLength={60}
                                transparent
                                value={form.phoneNumber ? form.phoneNumber : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                            <Form.Input
                                fluid
                                className='column'
                                type='date'
                                placeholder='Date of Birth'
                                name='dob'
                                maxLength={60}
                                transparent
                                value={form.dob ? form.dob : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div className='row'>
                            <Form.Button className='column' type='submit'>Save</Form.Button>
                        </div>
                    </div>
                </Form>
            </div>
            <div id='activityLog' className='content'>
                <label>Activity Log</label>
            </div>
            <div id='accountActions' className='content'>
                <label>Account Actions</label>
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
)(ProfileDetails);