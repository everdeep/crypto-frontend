import React from 'react';

const ProfileDetails: React.FC = () => {
    return (
        <div className='settings__content'>
            <h1>Profile Details</h1>
            <div id='generalInfo' className='content'>
                <label>General Info</label>
                <div className='ui input transparent form'>
                    <div className='ui vertically divided grid'>
                        <div className='two column row'>
                            <div className='column'>
                                <input type='text' placeholder='First Name' />
                            </div>
                            <div className='column'>
                                <input type='text' placeholder='Last Name' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='column'>
                                <input type='email' placeholder='Email' />
                            </div>
                        </div>
                        <div className='two column row'>
                            <div className='column'>
                                <input type='tel' placeholder='Phone Number' />
                            </div>
                            <div className='column'>
                                <input type='date' placeholder='Date of Birth' />
                            </div>
                        </div>
                        <div className='row'>
                            <button className='ui button'>Apply Changes</button>
                        </div>
                    </div>
                </div>
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

export default ProfileDetails;