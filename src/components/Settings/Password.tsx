import React from 'react';
import { connect } from 'react-redux';
import { formUpdate, formClear, alertSet } from '@src/actions';
import { Form } from 'semantic-ui-react';

interface PasswordProps {
    form: any;
    formUpdate: (name: string, value: string) => void;
    formClear: () => void;
    alertSet: (message: string, type: string) => void;
}

const Password: React.FC<PasswordProps> = ({form, formUpdate, formClear, alertSet}) => {

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
            <h1>Change Password</h1>
            <div className='content'>
                <label>Change Password</label>
                <Form onSubmit={handleSubmit}>
                    <div className='ui vertically divided grid'>
                        <div className='row'>
                            <Form.Input
                                fluid
                                className='column'
                                type='password'
                                placeholder='Password'
                                name='password'
                                maxLength={60}
                                transparent
                                value={form.password ? form.password : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div className='row'>
                            <Form.Input
                                fluid
                                className='column'
                                type='confirmPassword'
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                maxLength={60}
                                transparent
                                value={form.confirmPassword ? form.confirmPassword : ''}
                                onChange={(e) => handleUserInput(e)}
                            />
                        </div>
                        <div className='row'>
                            <Form.Button className='column' type='submit'>Save</Form.Button>
                        </div>
                    </div>
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
)(Password);