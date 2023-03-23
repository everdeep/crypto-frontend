import React from 'react';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet, signIn } from '@src/actions';
import { postUpdateUserDetails } from '@src/api/userService';
import { AppContextInterface, withAppContext } from '@src/components/App/AppContext';
import { ActivityLog } from './ActivityLog';
import { AccountActions } from './AccountActions';

import { Form } from 'semantic-ui-react';

import './ProfileDetails.scss';

interface ProfileDetailsProps {
    auth: any;
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
    signIn: (payload: any) => void;
    appContext: AppContextInterface;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({auth, form, formUpdate, formClear, alertSet, signIn, appContext}) => {

    const handleUserInput = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        formUpdate(name, value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        //
        // TODO: Validate form
        //

        appContext.setLoading(true);
        postUpdateUserDetails(form).then((res: any) => {
            signIn(res.data);
            alertSet('Profile details updated successfully.', 'success');
            appContext.setLoading(false);
        }).catch((err: any) => {
            alertSet(err.response.data.message, 'error');
            appContext.setLoading(false);
        });

        formClear();
    }

    return (
        <div className='settings__content'>
            <h1>Profile Details</h1>
            <div id='generalInfo' className='content'>
                <label>General Info</label>
                <Form onSubmit={handleSubmit}>
                    <div className='ui vertically divided grid'>
                        <div className='row'>
                            <Form.Input
                                    fluid
                                    className='column'
                                    type='text'
                                    placeholder={auth.username ? auth.username : 'Display name'}
                                    name='username'
                                    maxLength={60}
                                    transparent
                                    value={form.username ? form.username : ''}
                                    onChange={(e) => handleUserInput(e)}
                                />
                        </div>
                        <div className='two column row'>
                            <Form.Input
                                fluid
                                className='column'
                                type='text'
                                placeholder={auth.first_name ? auth.first_name : 'First Name'}
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
                                placeholder={auth.last_name ? auth.last_name : 'Last Name'}
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
                                    placeholder={auth.email ? auth.email : 'Email'}
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
                                placeholder={auth.phone ? auth.phone : 'Phone Number'}
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
                                value={form.dob ? form.dob : auth.dob ? auth.dob : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div className='row'>
                            <Form.Button className='column' type='submit'>Save</Form.Button>
                        </div>
                    </div>
                </Form>
            </div>
            <ActivityLog />
            <AccountActions />
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return { 
        form: state.form,
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    { formUpdate, formClear, alertSet, signIn }
)(withAppContext(ProfileDetails));