import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './Welcome.scss';

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <div className='__container'>
            <div className='__header'>
                <div className='main-heading'>
                    <h1 className='themed'><b>Welcome</b> to the Crypto Trading App</h1>
                </div>
            </div>
            <div className='__body'>
                Please login or register to continue
            </div>
            <div className='__footer'>
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