import React from 'react';

const Password: React.FC = () => {
    return (
        <div className='settings__content'>
            <h1>Change Password</h1>
            <div className='content'>
                <label>Change Password</label>
                <div className='ui input transparent form'>
                    <div className='ui vertically divided grid'>
                        <div className='row'>
                            <div className='column'>
                                <input type='password' placeholder='Current Password' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='column'>
                                <input type='password' placeholder='New Password' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='column'>
                                <input type='password' placeholder='Confirm New Password' />
                            </div>
                        </div>
                        <div className='row'>
                            <button className='ui button'>Apply Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Password;