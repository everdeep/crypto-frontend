import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './Welcome.scss';

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div id='erwt'>
            <div className='header'>
                <div className='main-heading'>
                    <h1 className='themed'><b>Welcome</b> to the Crypto Trading App</h1>
                </div>
                <p>
                    Please login or register to continue
                </p>
            </div>

            <div className='footer'>
                <div className='center'>
                    <Button onClick={(e) => navigate('/login')}>
                        Login
                    </Button>
                    <Button onClick={(e) => navigate('/register')}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
            
    );
};

export default Welcome;