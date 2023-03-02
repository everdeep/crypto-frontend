import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import { alertClear } from '../../actions';
import { Transition } from 'react-transition-group';
import {
    TransitionStatus,
} from 'react-transition-group/Transition';
import CSS from 'csstype';

import './Application.scss';
import 'semantic-ui-css/semantic.min.css'

// Public Components
import Welcome from '../Welcome';
import { Navigation } from '../Navigation';
import Alert from '../Alert';
import LoginForm from '../Authentication/LoginForm';
import RegisterForm from '../Authentication/RegisterForm';
import ResetPassword from '../Authentication/ResetPassword';

// Platform components
import Dashboard from '../Dashboard';
import Portfolio from '../Portfolio';
import Terminal from '../Terminal';
import Market from '../Market';
import News from '../News';

// Settings components
import Settings from '../Settings';
import ProfileDetails from '../Settings/ProfileDetails';
import Verification from '../Settings/Verification';
import Preferences from '../Settings/Preferences';
import Password from '../Settings/Password';
import Security from '../Settings/Security';
import Accounts from '../Settings/Accounts';
import Referrals from '../Settings/Referrals';
import NotFound from '../NotFound';

// Transition settings
const duration = 800;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles: Partial<Record<TransitionStatus, CSS.Properties>> = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

interface ApplicationProps {
    isSignedIn: boolean;
    alert: any;
    alertClear: () => void;
};

const Application: React.FC<ApplicationProps> = ({ isSignedIn, alert, alertClear }) => {

    const nodeRef = React.useRef(null);

    const [darkTheme, setDarkTheme] = useState(true);
    const [notFound, setNotFound] = useState(false);

    /**
     * On component mount
     */
    useEffect(() => {
        const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
        if (isNaN(useDarkTheme)) {
            setDarkTheme(true);
        } else if (useDarkTheme == 1) {
            setDarkTheme(true);
        } else if (useDarkTheme == 0) {
            setDarkTheme(false);
        }
    }, []);

    /**
     * On alert change
     * Clear alert after 5 seconds
     */
    useEffect(() => {
        if (alert.active) {
            setTimeout(() => {
                alertClear();
            }, 5000);
        }
    }, [alert.active]);

    /**
     * On Dark theme change
     */
    useEffect(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);

    /**
     * Toggle Theme
     */
    function toggleTheme() {
        setDarkTheme(!darkTheme);
    }

    return (
        <BrowserRouter>
            {isSignedIn && !notFound && <Navigation toggleTheme={toggleTheme} isDarkTheme={darkTheme} />}

            {alert.active && (
                <Transition className='alert' nodeRef={nodeRef} in={alert.active} timeout={duration}>
                    {state => (
                        <div ref={nodeRef} style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <Alert message={alert.message} className={alert.className} />
                        </div>
                    )}
                </Transition>
            )}

            <Routes>
                <Route element={<ProtectedRoute isSignedIn={!isSignedIn} redirectPath='/' />} >
                    <Route path='welcome' element={<Welcome />} />
                    <Route path='login' element={<LoginForm />} />
                    <Route path='register' element={<RegisterForm />} />
                    <Route path='reset-password' element={<ResetPassword />} />
                </Route>
                
                <Route element={<ProtectedRoute isSignedIn={isSignedIn} />} >
                    <Route index element={<Dashboard />} />
                    <Route path='portfolio' element={<Portfolio />} />
                    <Route path='terminal' element={<Terminal />} />
                    <Route path='market' element={<Market />} />
                    <Route path='news' element={<News />} />
                    <Route path='settings' element={<Settings />}>
                        <Route index element={<ProfileDetails />} />
                        <Route path='user' element={<ProfileDetails />} />
                        <Route path='verification' element={<Verification />} />
                        <Route path='preferences' element={<Preferences />} />
                        <Route path='password' element={<Password />} />
                        <Route path='security' element={<Security />} />
                        <Route path='accounts' element={<Accounts />} />
                        <Route path='referrals' element={<Referrals />} />
                        <Route path="*" element={<Navigate to="/error" replace />} />
                    </Route>
                    

                </Route>

                <Route path="error" element={<NotFound setNotFound={setNotFound}/>} />
                <Route path="*" element={<Navigate to="/error" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

const mapStateToProps = (state: any) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        alert: state.alert
    }
}

export default connect(
    mapStateToProps,
    { alertClear }
)(Application);
