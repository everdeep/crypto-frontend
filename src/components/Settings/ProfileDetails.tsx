import React from 'react';

import { Container } from 'semantic-ui-react';

const ProfileDetails: React.FC = () => {
    return (
        <div className='content'>
            <div className='header'>
                <div className='main-heading'>
                    <h1 className='themed'>Profile Details</h1>
                </div>
            </div>
            <Container fluid>
                <h1>Profile Details</h1>
            </Container>

        </div>
    );
}

export default ProfileDetails;